import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import { isMobile } from '../../utils/device';
import OpenMe from './OpenMe';
import Envelope from './Envelope';
import SecretNote from './SecretNote';
import './Surprise.css';

/**
 * Surprise ★ — the sealed surprise chapter.
 * OpenMe button → Envelope (tap to open, flap rotateX) → SecretNote
 * slides out with the surprise title, message and optional photo.
 */
export default function Surprise({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const surprise = useMemo(() => config?.surprise || {}, [config]);

  // 'invite' → OpenMe | 'envelope' → sealed envelope | 'revealed' → note
  const [stage, setStage] = useState('invite');
  const [envelopeOpening, setEnvelopeOpening] = useState(false);

  return (
    <section className="sur-root" aria-label="A surprise for you">
      <div className="sur-atmosphere" aria-hidden="true">
        <ParticleField count={mobile ? 20 : 50} color="#f0abfc" />
        <Vignette />
      </div>

      {onPrev && (
        <button type="button" className="sur-back" onClick={onPrev} aria-label="Go back">
          ← back
        </button>
      )}

      <div className="sur-inner">
        <AnimatePresence mode="wait">
          {stage === 'invite' && (
            <motion.div
              key="invite"
              className="sur-stage"
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              transition={{ duration: reduced ? 0.2 : 0.8 }}
            >
              <OpenMe
                label={surprise.buttonLabel}
                reduced={reduced}
                onOpen={() => setStage('envelope')}
              />
            </motion.div>
          )}

          {stage === 'envelope' && (
            <motion.div key="envelope" className="sur-stage">
              <Envelope
                opening={envelopeOpening}
                reduced={reduced}
                onOpen={() => setEnvelopeOpening(true)}
                onOpened={() => setStage('revealed')}
              />
            </motion.div>
          )}

          {stage === 'revealed' && (
            <motion.div
              key="revealed"
              className="sur-stage sur-stage-note"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.2 : 0.6 }}
            >
              <SecretNote
                title={surprise.title}
                message={surprise.message}
                image={surprise.image}
                reduced={reduced}
              />
              <motion.div
                className="sur-cta"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0.2 }
                    : { duration: 1.2, delay: 1.4, ease: 'easeOut' }
                }
              >
                <Button variant="primary" onClick={onNext} className="sur-continue">
                  Continue →
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
