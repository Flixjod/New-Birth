import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { rand } from '../../utils/random';
import { isMobile } from '../../utils/device';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * PurpleExplosion — radial burst of violet particles and light.
 * Plays once, then exits (parent removes it via AnimatePresence).
 */
export default function PurpleExplosion() {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const particles = useMemo(() => {
    const count = reduced ? 0 : mobile ? 14 : 28;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2);
      const dist = rand(22, 46); // vmin
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: rand(3, 8),
        delay: rand(0, 0.25),
        dur: rand(1.1, 1.7),
      };
    });
  }, [reduced, mobile]);

  return (
    <motion.div
      className="mid-explosion"
      aria-hidden="true"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        className="mid-flash"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 3.2, 4.5], opacity: [0, 1, 0] }}
        transition={{ duration: reduced ? 0.3 : 1.6, ease: 'easeOut' }}
      />
      <motion.div
        className="mid-ring"
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 3.4, opacity: 0 }}
        transition={{ duration: reduced ? 0.3 : 1.8, ease: 'easeOut', delay: reduced ? 0 : 0.15 }}
      />
      <motion.div
        className="mid-ring mid-ring--2"
        initial={{ scale: 0.2, opacity: 0.7 }}
        animate={{ scale: 2.6, opacity: 0 }}
        transition={{ duration: reduced ? 0.3 : 1.6, ease: 'easeOut', delay: reduced ? 0 : 0.35 }}
      />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="mid-particle"
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: `${p.x}vmin`, y: `${p.y}vmin`, opacity: 0, scale: 0.3 }}
          transition={{ duration: p.dur, ease: 'easeOut', delay: p.delay }}
        />
      ))}
    </motion.div>
  );
}
