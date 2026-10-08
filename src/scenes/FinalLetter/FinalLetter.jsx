import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';
import { letterPaper } from '../../animations/transitions/reveal';
import { fade, fadeUp } from '../../animations/transitions/fade';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Grain from '../../components/Effects/Grain';
import Vignette from '../../components/Effects/Vignette';
import FinalEnvelope from './FinalEnvelope';
import LetterReveal from './LetterReveal';
import './FinalLetter.css';

export default function FinalLetter({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState('envelope'); // 'envelope' | 'letter' | 'closing'

  const handleOpened = useCallback(() => {
    setPhase('letter');
  }, []);

  const handleLetterRead = useCallback(() => {
    setPhase('closing');
  }, []);

  const particleCount = isMobile() ? 40 : 70;

  return (
    <motion.section
      className="fl-root"
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      exit="hidden"
      variants={fade}
      aria-label="A final letter"
    >
      <ParticleField count={particleCount} color="lavender" />
      <Grain />
      <Vignette />

      <div className="fl-stage">
        <AnimatePresence mode="wait">
          {phase === 'envelope' && (
            <motion.div
              key="envelope"
              className="fl-phase"
              variants={fade}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              exit="hidden"
            >
              <FinalEnvelope
                teaser={config?.letter?.teaser}
                onOpened={handleOpened}
              />
            </motion.div>
          )}

          {phase === 'letter' && (
            <motion.div
              key="letter"
              className="fl-phase"
              variants={fade}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
              exit="hidden"
            >
              <LetterReveal
                letter={config?.letter}
                name={config?.name}
                onContinue={handleLetterRead}
              />
            </motion.div>
          )}

          {phase === 'closing' && (
            <motion.div
              key="closing"
              className="fl-phase fl-closing"
              variants={letterPaper}
              initial={reduceMotion ? 'visible' : 'hidden'}
              animate="visible"
            >
              <motion.p className="fl-eyebrow" variants={fadeUp}>
                and so
              </motion.p>
              <motion.h2 className="fl-hbd" variants={fadeUp}>
                HAPPY BIRTHDAY
              </motion.h2>
              {config?.name && (
                <motion.p className="fl-name" variants={fadeUp}>
                  {config.name}
                </motion.p>
              )}
              {config?.letter?.closingLine && (
                <motion.p className="fl-closing-line" variants={fadeUp}>
                  {config.letter.closingLine}
                </motion.p>
              )}
              <motion.div className="fl-actions" variants={fadeUp}>
                <Button variant="ghost" onClick={onPrev}>
                  Back
                </Button>
                <Button variant="primary" onClick={onNext}>
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
