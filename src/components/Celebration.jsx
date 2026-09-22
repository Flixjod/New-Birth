import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import Particles from './Particles';
import Confetti from './Confetti';

const BALLOONS = [
  { left: '6%', delay: '0s', size: 1, hue: 'lavender' },
  { left: '18%', delay: '1.6s', size: 0.75, hue: 'pink' },
  { left: '78%', delay: '0.9s', size: 0.9, hue: 'violet' },
  { left: '90%', delay: '2.4s', size: 0.7, hue: 'lavender' },
  { left: '48%', delay: '3.1s', size: 0.6, hue: 'pink' },
];

/** A CSS birthday cake with tappable candles. */
function Cake({ wish, onWishMade }) {
  const [lit, setLit] = useState([true, true, true]);
  const [wished, setWished] = useState(false);
  const [holding, setHolding] = useState(false);
  const holdRef = useRef(null);
  const holdStartRef = useRef(0);

  const anyLit = lit.some(Boolean);

  const startHold = () => {
    if (!anyLit || wished) return;
    setHolding(true);
    holdStartRef.current = Date.now();
    holdRef.current = setTimeout(() => {
      setLit([false, false, false]);
      setWished(true);
      setHolding(false);
      onWishMade?.();
    }, 1400);
  };

  const endHold = () => {
    setHolding(false);
    clearTimeout(holdRef.current);
  };

  useEffect(() => () => clearTimeout(holdRef.current), []);

  const relight = (i) => {
    setLit((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    if (wished && lit.every((v, j) => (j === i ? true : v))) setWished(false);
  };

  return (
    <div className="cake-wrap">
      <div className="cake" aria-label="Birthday cake">
        <div className="cake-candles">
          {lit.map((isLit, i) => (
            <button
              key={i}
              className={`candle ${isLit ? 'is-lit' : 'is-out'}`}
              onClick={() => !isLit && relight(i)}
              aria-label={isLit ? `Candle ${i + 1} burning` : `Relight candle ${i + 1}`}
            >
              <span className="flame" aria-hidden="true" />
              <span className="smoke" aria-hidden="true" />
              <span className="wick" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="cake-top" aria-hidden="true">
          <span className="drip" />
          <span className="drip d2" />
          <span className="drip d3" />
        </div>
        <div className="cake-body" aria-hidden="true">
          <span className="cake-glow-dot" />
          <span className="cake-glow-dot g2" />
          <span className="cake-glow-dot g3" />
        </div>
        <div className="cake-plate" aria-hidden="true" />
      </div>

      {!wished ? (
        <button
          className={`wish-btn ${holding ? 'is-holding' : ''}`}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="wish-btn-fill" aria-hidden="true" />
          <span className="wish-btn-label">{anyLit ? wish.holdLabel : 'tap a candle to relight it'}</span>
        </button>
      ) : (
        <p className="wished-text">{wish.wishedText}</p>
      )}
    </div>
  );
}

/**
 * Celebration chapter: balloons drift, the cake waits,
 * and a wish can be sent to the stars.
 */
export default function Celebration({ name, wish }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const confettiRef = useRef(null);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => confettiRef.current?.burst(110), 500);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section ref={ref} className={`chapter celebration ${inView ? 'is-visible' : ''}`} aria-label="Celebration">
      <Particles intensity={0.65} interactive={false} />
      <Confetti ref={confettiRef} />

      <div className="balloons" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <div
            key={i}
            className={`balloon hue-${b.hue}`}
            style={{ left: b.left, animationDelay: b.delay, ['--s']: b.size }}
          >
            <span className="balloon-knot" />
          </div>
        ))}
      </div>

      <div className="celebration-inner">
        <p className="chapter-kicker reveal-up">the celebration begins</p>
        <h2 className="chapter-title reveal-up">
          Happy Birthday, <span className="glow-name">{name}</span>
        </h2>
        <p className="chapter-sub reveal-up">Tonight the universe is throwing you a party — you’re the guest of honor.</p>

        <div className="reveal-up">
          <Cake wish={wish} onWishMade={() => confettiRef.current?.sprinkle(70)} />
        </div>
        <p className="cake-caption reveal-up">{wish.prompt}</p>
      </div>
    </section>
  );
}
