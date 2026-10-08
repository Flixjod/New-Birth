import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ParticleField from '../../components/Effects/ParticleField';
import { isMobile } from '../../utils/device';
import { sendBurst } from '../../animations/phone/sendMessage';

/**
 * SendAnimation — the reply compresses, rises, dissolves into a
 * purple glow + particle burst; "Delivered ✦" fades in.
 * Calls onDone once the beat has landed.
 */
export default function SendAnimation({ text, onDone }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 1000 : 2500);
    return () => clearTimeout(t);
  }, [onDone, reduced]);

  return (
    <div className="ph-sendanim" aria-hidden>
      {!reduced && (
        <ParticleField
          count={mobile ? 14 : 30}
          color="#a78bfa"
          className="ph-burst"
        />
      )}
      <motion.div
        className="ph-sendbubble"
        variants={sendBurst}
        initial="hidden"
        animate="visible"
      >
        {text}
      </motion.div>
      <motion.div
        className="ph-delivered"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0.4 : 1.25, duration: 0.7, ease: 'easeOut' }}
      >
        Delivered ✦
      </motion.div>
    </div>
  );
}
