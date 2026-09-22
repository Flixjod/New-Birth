import { useEffect, useRef, useState } from 'react';
import Particles from './Particles';
import Confetti from './Confetti';

/**
 * The midnight moment, staged like cinema:
 * darkness → a point of purple light → particles gather →
 * the light blooms → HAPPY BIRTHDAY → the glowing name.
 */
const STAGES = ['dark', 'spark', 'gather', 'bloom', 'title', 'name', 'settle'];

export default function Reveal({ name, onComplete }) {
  const [stage, setStage] = useState(0);
  const confettiRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const timings = [900, 900, 1300, 1100, 1300, 1900, 1600];
    let t;
    const advance = (i) => {
      if (i >= STAGES.length) {
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete();
        }
        return;
      }
      setStage(i);
      if (STAGES[i] === 'bloom') {
        confettiRef.current?.burst(150);
      }
      if (STAGES[i] === 'name') {
        confettiRef.current?.sprinkle(60);
      }
      t = setTimeout(() => advance(i + 1), timings[i]);
    };
    const start = setTimeout(() => advance(1), 500);
    return () => {
      clearTimeout(start);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = STAGES[Math.min(stage, STAGES.length - 1)];

  return (
    <div className={`reveal stage-${current}`} role="status" aria-label="Happy birthday reveal">
      <Particles intensity={current === 'dark' || current === 'spark' ? 0.25 : 0.9} />
      <Confetti ref={confettiRef} className="reveal-confetti" />

      <div className="reveal-center">
        <div className="reveal-light" aria-hidden="true" />
        <div className="reveal-rays" aria-hidden="true" />
      </div>

      <div className="reveal-text">
        <h2 className="reveal-title">
          <span>HAPPY</span> <span>BIRTHDAY</span>
        </h2>
        <div className="reveal-name">{name}</div>
        <p className="reveal-sub">the day the stars were waiting for</p>
      </div>

      <div className="intro-grain" aria-hidden="true" />
    </div>
  );
}
