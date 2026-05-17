import { AnimatePresence, motion } from 'framer-motion';
import { Coins, Sparkles, X } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext.jsx';

export default function EcoCoinPopup({ popup, onDismiss }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!popup) return undefined;
    const timer = window.setTimeout(onDismiss, 5200);
    return () => window.clearTimeout(timer);
  }, [popup, onDismiss]);

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
            onClick={onDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-lime-200/40 bg-gradient-to-br from-ink-950 via-eco-900 to-eco-600 p-8 text-center text-white shadow-2xl"
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <button
              type="button"
              onClick={onDismiss}
              className="absolute right-4 top-4 rounded-full p-2 text-white/60 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime-300/20 ring-4 ring-lime-300/30"
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: 2 }}
            >
              <Coins className="h-10 w-10 text-lime-300" />
            </motion.div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-lime-200/80">{t('coins.earned')}</p>
            <motion.p
              className="mt-2 text-6xl font-black text-lime-300"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
            >
              +{popup.amount}
            </motion.p>
            <p className="mt-4 text-lg font-bold leading-relaxed text-white/75">{popup.message}</p>

            <motion.div
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Sparkles className="h-4 w-4 text-lime-300" />
              {t('coins.useMarketplace')}
            </motion.div>

            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute text-2xl"
                style={{ left: `${12 + i * 14}%`, top: `${20 + (i % 3) * 18}%` }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [-10, -50] }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1.4 }}
              >
                🪙
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
