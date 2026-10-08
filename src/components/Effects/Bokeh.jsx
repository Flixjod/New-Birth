import { useMemo } from 'react';
import { isMobile } from '../../utils/device';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { rand } from '../../utils/random';

/** Soft drifting bokeh circles. Props: count. */
export default function Bokeh({ count = 14, className = '' }) {
  const reduced = useReducedMotion();
  const dots = useMemo(() => {
    const n = isMobile() ? Math.min(count, 7) : count;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: rand(2, 98),
      top: rand(4, 96),
      size: rand(40, 140),
      duration: rand(9, 20),
      delay: rand(-20, 0),
      hue: Math.random() < 0.7 ? '139,92,246' : '240,171,252',
      opacity: rand(0.08, 0.22),
    }));
  }, [count]);

  return (
    <div className={`nb-bokeh ${className}`} aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="nb-bokeh-dot"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            background: `radial-gradient(circle, rgba(${d.hue},0.5) 0%, rgba(${d.hue},0) 70%)`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            animationPlayState: reduced ? 'paused' : 'running',
          }}
        />
      ))}
    </div>
  );
}
