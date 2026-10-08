import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Grain from '../../components/Effects/Grain';
import CountdownDisplay from './CountdownDisplay';
import CountdownAtmosphere from './CountdownAtmosphere';
import { useCountdown } from '../../hooks/useCountdown';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Countdown.css';

/**
 * Scene 3 — the wait. Ticks toward 00:00 on config.birthday in
 * config.timezone. When the moment arrives, the screen blooms into
 * "The day has arrived ✦" and advances automatically after a short beat.
 */
export default function Countdown({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const advancedRef = useRef(false);

  const { days, hours, minutes, seconds, total, isLive, done } = useCountdown(
    config?.birthday,
    config?.timezone
  );
  // Defensive: the documented API exposes `isLive`; fall back gracefully.
  const live = isLive ?? done ?? false;

  const go = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    onNext();
  }, [onNext]);

  // If the countdown flips live while we're mounted, move on after a beat.
  useEffect(() => {
    if (!live) return;
    const beat = reduceMotion ? 500 : 2500;
    const t = setTimeout(go, beat);
    return () => clearTimeout(t);
  }, [live, go, reduceMotion]);

  const liveTitle = config?.countdownLiveLine ?? 'The day has arrived ✦';
  const waitTitle = config?.countdownWaitLine ?? 'until the clock strikes midnight';

  return (
    <section className="cd-scene" aria-label="Countdown to midnight">
      <CountdownAtmosphere total={total} />
      <Grain />

      <div className="cd-stage">
        <AnimatePresence mode="wait">
          {live ? (
            <motion.div
              key="live"
              className="cd-live"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="cd-live-title">{liveTitle}</p>
              <Button variant="primary" onClick={go} className="cd-continue">
                Continue ✦
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              className="cd-waiting"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="cd-eyebrow">counting down</p>
              <CountdownDisplay
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                reducedMotion={reduceMotion}
              />
              <p className="cd-caption">{waitTitle}</p>
              <Button variant="ghost" onClick={onPrev} className="cd-back">
                ← Back
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
