import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export default function ToastStack({ toasts, dismissToast }) {
  return (
    <div className="fixed right-4 top-24 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="flex items-start gap-3 rounded-3xl border border-white/50 bg-white/88 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-ink-900/90"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-eco-100 text-eco-700 dark:bg-eco-500/18 dark:text-eco-200">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-black text-ink-950 dark:text-white">{toast.title}</p>
              <p className="mt-1 text-sm leading-6 text-ink-800/62 dark:text-white/58">{toast.text}</p>
            </div>
            <button type="button" onClick={() => dismissToast(toast.id)} className="rounded-full p-1 text-ink-950/50 hover:bg-eco-50 dark:text-white/50 dark:hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
