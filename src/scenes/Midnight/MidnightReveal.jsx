import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PurpleExplosion from './PurpleExplosion';
import NameReveal from './NameReveal';
import Button from '../../components/UI/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Midnight.css';

// phase 0: purple burst · phase 1: name reveal · phase 2: drift / push-through
const TIMINGS = { name: 1800, drift: 6000, end: 9200 };
const REDUCED_HOLD = 2600;

/**
 * MidnightReveal ★ — timed cinematic sequence, then onNext().
 * Guarded against double-advance; timeouts cleaned up on unmount.
 */
export default function MidnightReveal({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 1 : 0);
  const doneRef = useRef(false);
  const timers = useRef([]);

  const advance = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onNext();
  };

  useEffect(() => {
    if (reduced) {
      timers.current.push(setTimeout(advance, REDUCED_HOLD));
    } else {
      timers.current.push(setTimeout(() => setPhase(1), TIMINGS.name));
      timers.current.push(setTimeout(() => setPhase(2), TIMINGS.drift));
      timers.current.push(setTimeout(advance, TIMINGS.end));
    }
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const name = config?.name || '';
  const memories = Array.isArray(config?.memories) ? config.memories : [];

  return (
    <div className="mid-root">
      <div className="mid-stage">
        <AnimatePresence>{phase === 0 && <PurpleExplosion key="burst" />}</AnimatePresence>
        {phase >= 1 && <NameReveal name={name} drift={phase === 2} memories={memories} />}
      </div>
      <div className="mid-skip">
        <Button variant="ghost" onClick={advance}>
          Skip
        </Button>
      </div>
    </div>
  );
}
