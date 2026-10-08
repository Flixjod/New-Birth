import { motion, AnimatePresence } from 'framer-motion';
import { pad2 } from '../../utils/timezone';

/**
 * Large serif digits for days / hours / minutes / seconds.
 * Each unit crossfades with a soft rise when its value changes.
 */
export default function CountdownDisplay({ days, hours, minutes, seconds, reducedMotion }) {
  const units = [
    { value: String(Math.max(0, days ?? 0)), label: 'days' },
    { value: pad2(Math.max(0, hours ?? 0)), label: 'hours' },
    { value: pad2(Math.max(0, minutes ?? 0)), label: 'minutes' },
    { value: pad2(Math.max(0, seconds ?? 0)), label: 'seconds' },
  ];

  return (
    <div className="cd-display" role="timer" aria-live="off">
      {units.map((unit) => (
        <div className="cd-unit" key={unit.label}>
          <div className="cd-value">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={unit.value}
                className="cd-digit"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -22, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {unit.value}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="cd-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
