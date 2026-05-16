import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Chatbot from './components/Chatbot.jsx';
import Navbar from './components/Navbar.jsx';
import ToastStack from './components/Toast.jsx';
import Community from './sections/Community.jsx';
import Dashboard from './sections/Dashboard.jsx';
import LandingPage from './sections/LandingPage.jsx';
import PickupScheduling from './sections/PickupScheduling.jsx';
import Rewards from './sections/Rewards.jsx';
import SegregationGuide from './sections/SegregationGuide.jsx';
import WasteScanner from './sections/WasteScanner.jsx';
import { navItems } from './data/mockData.js';
import Leaderboard from "./sections/Leaderboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [activeSection, setActiveSection] = useState('home');
  const [toasts, setToasts] = useState([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.18, 0.32, 0.48], rootMargin: '-20% 0px -55% 0px' },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

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

  useEffect(() => {
    addToast('EcoSort AI ready', `Assistant language set to ${language}.`);
  }, [language]);

  return (
    <div className="min-h-screen overflow-hidden text-ink-950 dark:text-white">
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-eco-500 via-lime-300 to-blue-500" style={{ scaleX }} />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
      />
      <main>
        <LandingPage setActiveSection={setActiveSection} />
        <WasteScanner onToast={addToast} />
        <Rewards />
        <Leaderboard />
        <Dashboard />
        <SegregationGuide />
        <PickupScheduling onToast={addToast} />
        <Community />
      </main>
      <footer className="px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[2rem] border border-eco-900/10 bg-white/62 p-5 text-center text-sm font-bold text-ink-800/56 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white/46 sm:flex-row sm:text-left">
          <span>EcoSort AI • Clean City Solutions + Smart Recycling Assistant</span>
          <span>Built for citizens, recyclers, and municipal teams.</span>
        </div>
      </footer>
      <Chatbot onToast={addToast} />
      <ToastStack toasts={toasts} dismissToast={dismissToast} />
    </div>
  );
}
