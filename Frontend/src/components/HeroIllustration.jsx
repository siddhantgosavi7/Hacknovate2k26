import { motion } from 'framer-motion';
import { Bot, Leaf, Recycle, ScanLine, Sparkles } from 'lucide-react';

export default function HeroIllustration() {
  const orbitItems = [
    { icon: Recycle, label: 'Sort', className: 'left-2 top-10 bg-eco-500' },
    { icon: ScanLine, label: 'Scan', className: 'right-0 top-24 bg-blue-500' },
    { icon: Leaf, label: 'Save', className: 'bottom-12 left-8 bg-lime-500' },
    { icon: Sparkles, label: 'AI', className: 'bottom-4 right-12 bg-teal-500' },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="absolute inset-8 rounded-full border border-eco-600/14 bg-gradient-to-br from-white/85 to-eco-100/60 shadow-glass backdrop-blur-xl dark:border-white/10 dark:from-white/12 dark:to-eco-500/10" />
      <div className="absolute inset-16 rounded-full border border-dashed border-eco-600/30 dark:border-eco-200/20" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-full w-full rounded-[2.2rem] bg-gradient-to-br from-ink-950 via-eco-800 to-eco-500 p-1 shadow-glow"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="grid h-full place-items-center rounded-[1.9rem] bg-white/12 p-6 text-center text-white backdrop-blur-xl">
            <div>
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[1.6rem] bg-white/18">
                <Bot className="h-11 w-11" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-eco-100">EcoSort AI</p>
              <p className="mt-2 text-3xl font-black">Scan. Sort. Save.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {orbitItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className={`absolute ${item.className} flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg`}
            animate={{ y: [0, index % 2 ? -14 : 14, 0] }}
            transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </motion.div>
        );
      })}

      <motion.div
        className="absolute inset-[9%] rounded-full border border-eco-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-eco-500 shadow-glow" />
      </motion.div>
    </div>
  );
}
