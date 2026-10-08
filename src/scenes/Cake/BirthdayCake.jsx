import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Glow from '../../components/Effects/Glow';
import Vignette from '../../components/Effects/Vignette';
import { isMobile } from '../../utils/device';
import { shuffle } from '../../utils/random';
import Candle from './Candle';
import WishInteraction from './WishInteraction';
import './Cake.css';

/**
 * BirthdayCake ★ — a CSS-drawn violet/pink birthday cake with
 * flickering candles. Press-and-hold (or tap) to blow them out:
 * flames die one by one, smoke wisps rise, and the wish is sent
 * to the stars.
 */
export default function BirthdayCake({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const wish = useMemo(() => config?.wish || {}, [config]);
  const candleCount = mobile ? 3 : 5;

  const [outCount, setOutCount] = useState(0);
  const [blowing, setBlowing] = useState(false);
  const [wished, setWished] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const stash = timers.current;
    return () => stash.forEach(clearTimeout);
  }, []);

  const blowOrder = useMemo(
    () => shuffle(Array.from({ length: candleCount }, (_, i) => i)),
    [candleCount]
  );

  const isLit = (i) => {
    const pos = blowOrder.indexOf(i);
    return pos >= outCount;
  };

  const blowOut = () => {
    if (blowing || wished) return;
    setBlowing(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (reduced) {
      setOutCount(candleCount);
      timers.current.push(setTimeout(() => setWished(true), 700));
      return;
    }

    blowOrder.forEach((_, step) => {
      timers.current.push(
        setTimeout(() => setOutCount(step + 1), 350 + step * 260)
      );
    });
    timers.current.push(
      setTimeout(
        () => setWished(true),
        350 + blowOrder.length * 260 + 900
      )
    );
  };

  return (
    <section className="cake-root" aria-label="Make a wish">
      <div className="cake-atmosphere" aria-hidden="true">
        <ParticleField count={mobile ? 24 : 60} color="#f0abfc" />
        <Glow />
        <Vignette />
      </div>

      {onPrev && (
        <button type="button" className="cake-back" onClick={onPrev} aria-label="Go back">
          ← back
        </button>
      )}

      <div className="cake-inner">
        <motion.header
          className="cake-head"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.4, ease: 'easeOut' }}
        >
          <p className="cake-kicker">close your eyes</p>
          <h2 className="cake-title">{wish.prompt || 'Make a wish…'}</h2>
        </motion.header>

        <motion.div
          className="cake-stage"
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cake-candles">
            {Array.from({ length: candleCount }, (_, i) => (
              <Candle key={i} index={i} lit={isLit(i)} reduced={reduced} />
            ))}
          </div>

          <div className="cake-tiers" aria-hidden="true">
            <div className="cake-tier cake-tier-top">
              <span className="cake-drip" />
            </div>
            <div className="cake-tier cake-tier-bottom">
              <span className="cake-drip" />
            </div>
            <div className="cake-plate" />
          </div>

          <div className="cake-shadow" aria-hidden="true" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!wished && (
            <motion.div
              key="wish-cta"
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <WishInteraction
                onBlowOut={blowOut}
                blown={blowing}
                reduced={reduced}
                holdLabel={wish.holdLabel}
              />
            </motion.div>
          )}

          {wished && (
            <motion.div
              key="wished"
              className="cake-wished"
              initial={reduced ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={reduced ? { duration: 0.4 } : { duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="cake-wished-text">{wish.wishedText || '✦ wish sent to the stars ✦'}</p>
              <Button variant="primary" onClick={onNext} className="cake-continue">
                Continue →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
