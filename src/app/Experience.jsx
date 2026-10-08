import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scenes } from './experienceFlow';
import { sceneEnter, sceneExit } from '../animations/transitions/cinematic';
import { useAudio } from '../components/Audio/AudioManager';
import ProgressIndicator from '../components/UI/ProgressIndicator';
import MusicToggle from '../components/Audio/MusicToggle';

/**
 * Experience — the central story controller.
 * One scene on screen at a time, cinematic crossfades between chapters.
 * Scenes advance themselves via onNext(); the controller owns the order.
 */
export default function Experience({ config }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { unlock } = useAudio();

  const go = useCallback((delta) => {
    setDirection(delta >= 0 ? 1 : -1);
    setIndex((i) => Math.max(0, Math.min(scenes.length - 1, i + delta)));
  }, []);

  const onNext = useCallback(() => go(1), [go]);
  const onPrev = useCallback(() => go(-1), [go]);
  const onReplay = useCallback(() => {
    setDirection(-1);
    setIndex(0);
  }, []);

  // Audio unlocks on the visitor's first gesture (mobile autoplay rules).
  useEffect(() => {
    const handler = () => unlock();
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [unlock]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  const { id, component: Scene } = scenes[index];

  return (
    <div className="nb-experience">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={id}
          className="nb-scene-wrap"
          variants={{ hidden: sceneEnter.hidden, show: sceneEnter.show, exit: sceneExit }}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <Scene config={config} onNext={onNext} onPrev={onPrev} onReplay={onReplay} />
        </motion.div>
      </AnimatePresence>

      <ProgressIndicator index={index} total={scenes.length} />

      {index > 0 && (
        <button className="nb-back" onClick={onPrev} aria-label="Previous chapter">
          ‹
        </button>
      )}

      <MusicToggle />
    </div>
  );
}
