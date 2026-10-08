import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';

const TRAILS = [
  { angle: -24, top: '22%', dur: 26, delay: 0 },
  { angle: 18, top: '58%', dur: 32, delay: -8 },
  { angle: -12, top: '80%', dur: 38, delay: -16 },
];

/**
 * MemoryLightTrails — slow diagonal streaks of violet light drifting
 * across the void. CSS keyframes (transform + opacity only); fewer and
 * simpler on mobile; none at all with reduced motion.
 */
export default function MemoryLightTrails() {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  if (reduced) return null;

  const trails = mobile ? TRAILS.slice(0, 2) : TRAILS;

  return (
    <div className="mw-trails" aria-hidden="true">
      {trails.map((t, i) => (
        <div
          key={i}
          className="mw-trail"
          style={{
            top: t.top,
            animationDuration: `${t.dur}s`,
            animationDelay: `${t.delay}s`,
            '--tilt': `${t.angle}deg`,
          }}
        />
      ))}
    </div>
  );
}
