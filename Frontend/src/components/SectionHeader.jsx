import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, text, align = 'center' }) {
  return (
    <motion.div
      className={`mx-auto mb-10 max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-eco-700 dark:text-eco-200">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-ink-950 dark:text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-ink-800/68 dark:text-white/64 sm:text-lg">{text}</p>}
    </motion.div>
  );
}
