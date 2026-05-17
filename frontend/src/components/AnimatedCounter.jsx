import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, suffix = '', duration = 1400 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let frame;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
