import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function DriftPhoto({ photo, reduced }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <motion.div
      className="mid-mem-photo"
      style={{ left: photo.left, top: photo.top }}
      initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%', rotate: photo.rot }}
      animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%', rotate: photo.rot }}
      transition={{ duration: reduced ? 0.4 : 1.4, delay: photo.delay, ease: 'easeOut' }}
    >
      <img src={photo.image} alt="" onError={() => setOk(false)} />
    </motion.div>
  );
}

/**
 * NameReveal — "HAPPY BIRTHDAY" eyebrow, then the name in glowing script.
 * When `drift` is true the name glows brighter and recedes (scale down +
 * blur) while memory photos fade in around it, as the camera pushes through.
 */
export default function NameReveal({ name, drift, memories }) {
  const reduced = useReducedMotion();
  const letters = useMemo(() => (name || '').split(''), [name]);

  const driftPhotos = useMemo(() => {
    const list = Array.isArray(memories) ? memories.filter((m) => m && m.image) : [];
    return list.slice(0, 6).map((m, i) => ({
      image: m.image,
      left: `${8 + ((i * 53) % 84)}%`,
      top: `${10 + ((i * 37) % 72)}%`,
      rot: ((i * 29) % 24) - 12,
      delay: reduced ? 0 : 0.4 + i * 0.28,
    }));
  }, [memories, reduced]);

  return (
    <div className="mid-name-stage">
      {drift && (
        <div className="mid-memories" aria-hidden="true">
          {driftPhotos.map((p, i) => (
            <DriftPhoto key={i} photo={p} reduced={reduced} />
          ))}
        </div>
      )}
      <motion.div
        className="mid-name-wrap"
        initial={false}
        animate={
          drift
            ? { scale: 0.55, opacity: 0.95, filter: 'blur(12px) brightness(1.8)' }
            : { scale: 1, opacity: 1, filter: 'blur(0px) brightness(1)' }
        }
        transition={{ duration: reduced ? 0.4 : 2.4, ease: 'easeInOut' }}
      >
        <motion.p
          className="mid-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: reduced ? 0.3 : 1.6, delay: reduced ? 0 : 0.2 }}
        >
          HAPPY BIRTHDAY
        </motion.p>
        <h1 className="mid-name" aria-label={name ? `Happy birthday ${name}` : 'Happy birthday'}>
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="mid-letter"
              aria-hidden="true"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: reduced ? 0.25 : 0.9,
                delay: reduced ? 0 : 0.5 + i * 0.09,
                ease: 'easeOut',
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </div>
  );
}
