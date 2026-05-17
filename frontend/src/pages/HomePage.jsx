import { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import { motion, useScroll, useSpring } from 'framer-motion';
import Chatbot from '../components/Chatbot.jsx';
import ToastStack from '../components/Toast.jsx';
import Community from '../sections/Community.jsx';
import Dashboard from '../sections/Dashboard.jsx';
import LandingPage from '../sections/LandingPage.jsx';
import PickupScheduling from '../sections/PickupScheduling.jsx';
import Rewards from '../sections/Rewards.jsx';
import SegregationGuide from '../sections/SegregationGuide.jsx';
import WasteScanner from '../sections/WasteScanner.jsx';

export default function HomePage() {
  const { t } = useTranslation();
  const [toasts, setToasts] = useState([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  const addToast = (title, text) => {
    const id = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setToasts((current) => [{ id, title, text }, ...current].slice(0, 4));
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4400);
  };

  const dismissToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-eco-500 via-lime-300 to-blue-500"
        style={{ scaleX }}
      />
      <main>
        <LandingPage />
        <WasteScanner onToast={addToast} />
        <Rewards />
        <Dashboard />
        <SegregationGuide />
        <PickupScheduling onToast={addToast} />
        <Community />
      </main>
      <footer className="px-4 py-10">
        <motion.div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[2rem] border border-eco-900/10 bg-white/62 p-5 text-center text-sm font-bold text-ink-800/56 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white/46 sm:flex-row sm:text-left">
          <span>{t('footer.line1')}</span>
          <span>{t('footer.line2')}</span>
        </motion.div>
      </footer>
      <Chatbot onToast={addToast} />
      <ToastStack toasts={toasts} dismissToast={dismissToast} />
    </>
  );
}
