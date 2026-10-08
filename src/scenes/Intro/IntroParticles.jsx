import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../../components/Effects/ParticleField';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';

/**
 * Faint drifting motes behind the intro lines.
 * CSS-only motion via ParticleField; renders nothing when the user
 * prefers reduced motion.
 */
export default function IntroParticles() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  const count = isMobile() ? 24 : 60;

  return (
    <div className="intro-particles" aria-hidden="true">
      <ParticleField count={count} color="#a78bfa" />
    </div>
  );
}
