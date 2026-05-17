import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`glass rounded-[2rem] p-5 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

export function PillButton({ children, variant = 'primary', className = '', ...props }) {
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-eco-600 to-blue-600 text-white shadow-glow hover:shadow-2xl'
      : 'border border-eco-900/12 bg-white/65 text-ink-950 hover:bg-eco-50 dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:bg-white/12';

  return (
    <motion.button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition ${styles} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ProgressBar({ value, label, color = 'from-eco-500 to-lime-300' }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold">
        <span className="text-ink-900 dark:text-white">{label}</span>
        <span className="text-eco-700 dark:text-eco-200">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-eco-100 dark:bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function IconBadge({ icon: Icon, className = '' }) {
  return (
    <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-eco-100 text-eco-700 dark:bg-white/10 dark:text-eco-200 ${className}`}>
      <Icon className="h-6 w-6" />
    </span>
  );
}
