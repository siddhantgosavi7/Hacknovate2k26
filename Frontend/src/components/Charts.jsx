import { motion } from 'framer-motion';

export function DonutChart({ data, size = 188 }) {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 188 188" className="-rotate-90">
        <circle cx="94" cy="94" r={radius} fill="none" stroke="currentColor" strokeWidth="18" className="text-eco-100 dark:text-white/10" />
        {data.map((item) => {
          const dash = (item.value / 100) * circumference;
          const circle = (
            <motion.circle
              key={item.label}
              cx="94"
              cy="94"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${dash} ${circumference - dash}` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-black text-ink-950 dark:text-white">86%</p>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">Sorted</p>
      </div>
    </div>
  );
}

export function BarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <div className="flex h-56 items-end gap-3">
      {data.map((item, index) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
          <div className="flex h-44 w-full items-end rounded-full bg-eco-100/80 p-1 dark:bg-white/10">
            <motion.div
              className="w-full rounded-full bg-gradient-to-t from-eco-700 via-eco-500 to-lime-300 shadow-glow"
              initial={{ height: 0 }}
              whileInView={{ height: `${(item.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-xs font-bold text-ink-800/70 dark:text-white/60">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ data }) {
  const width = 520;
  const height = 180;
  const max = Math.max(...data.map((item) => item.value));
  const min = Math.min(...data.map((item) => item.value));
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((item.value - min) / (max - min)) * (height - 24) - 12;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white/45 p-4 dark:bg-white/5">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full">
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1fb767" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#1fb767" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={(line + 1) * 36}
            y2={(line + 1) * 36}
            stroke="currentColor"
            strokeDasharray="4 8"
            className="text-eco-900/10 dark:text-white/10"
          />
        ))}
        <motion.polyline
          points={`0,${height} ${points} ${width},${height}`}
          fill="url(#lineFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#1fb767"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        {data.map((item, index) => {
          const [x, y] = points.split(' ')[index].split(',');
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} r="6" fill="#f7fbf8" stroke="#1fb767" strokeWidth="4" />
            </g>
          );
        })}
      </svg>
      <div className="grid grid-cols-4 gap-2 text-xs font-bold text-ink-800/60 dark:text-white/50 sm:grid-cols-8">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}
