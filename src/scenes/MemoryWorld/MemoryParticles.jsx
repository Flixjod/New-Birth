import { useMemo } from 'react';
import { rand } from '../../utils/random';
import { isMobile } from '../../utils/device';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * MemoryParticles — faint drifting motes of violet light.
 * Transform/opacity keyframes only; fewer particles on mobile;
 * static when reduced motion is on.
 */
export default function MemoryParticles() {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const dots = useMemo(() => {
    const count = mobile ? 16 : 42;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand(0, 100),
      top: rand(0, 100),
      size: rand(1.5, 4),
      dur: rand(7, 16),
      delay: rand(0, 12),
      drift: rand(14, 42),
      color: i % 3 === 0 ? '#f0abfc' : i % 3 === 1 ? '#a78bfa' : '#c4b5fd',
    }));
  }, [mobile]);

  return (
    <div className="mw-particles" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="mw-particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            color: d.color,
            animationDuration: reduced ? '0s' : `${d.dur}s`,
            animationDelay: `${d.delay}s`,
            '--drift': `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
