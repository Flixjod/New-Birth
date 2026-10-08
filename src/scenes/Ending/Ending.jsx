import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';
import { fade, fadeUp } from '../../animations/transitions/fade';
import ParticleField from '../../components/Effects/ParticleField';
import Grain from '../../components/Effects/Grain';
import Vignette from '../../components/Effects/Vignette';
import Replay from './Replay';
import './Ending.css';

export default function Ending({ config, onNext, onPrev, onReplay }) {
  const reduceMotion = useReducedMotion();
  const particleCount = isMobile() ? 35 : 60;

  return (
    <motion.section
      className="end-root"
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      exit="hidden"
      variants={fade}
      aria-label="The end"
    >
      <ParticleField count={particleCount} color="violet" />
      <Grain />
      <Vignette />

      <motion.div
        className="end-content"
        variants={fadeUp}
        initial={reduceMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        {config?.name && (
          <motion.p
            className="end-name"
            variants={fade}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={{ delay: reduceMotion ? 0 : 0.8, duration: 2 }}
          >
            {config.name}
          </motion.p>
        )}

        {config?.letter?.madeWith && (
          <motion.p
            className="end-made"
            variants={fade}
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            transition={{ delay: reduceMotion ? 0 : 1.8, duration: 2 }}
          >
            {config.letter.madeWith}
          </motion.p>
        )}

        <Replay onReplay={onReplay} onPrev={onPrev} />
      </motion.div>

      <motion.div
        className="end-fade-to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 6, delay: reduceMotion ? 0 : 4 }}
        aria-hidden="true"
      />
    </motion.section>
  );
}
