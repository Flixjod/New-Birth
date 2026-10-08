import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ParticleField from '../../components/Effects/ParticleField';
import { isMobile } from '../../utils/device';

/**
 * LoveMessage — the sent reply expands out of the phone and
 * becomes glowing handwritten typography. Holds, then onDone.
 */
export default function LoveMessage({ text, onDone }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 1500 : 3400);
    return () => clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <motion.div
      className="ph-love"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.3 : 0.9, ease: 'easeOut' }}
    >
      <div className="ph-love-glow" aria-hidden />
      {!reduced && (
        <ParticleField
          count={mobile ? 18 : 44}
          color="#8b5cf6"
          className="ph-love-dust"
        />
      )}
      <motion.p
        className="ph-love-text"
        initial={{ opacity: 0, scale: 0.72, filter: 'blur(16px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: reduced ? 0.5 : 1.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
