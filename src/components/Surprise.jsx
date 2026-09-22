import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import Particles from './Particles';
import Confetti from './Confetti';

/**
 * Interactive surprise: a sealed card. On opening, the world dims,
 * purple particles gather, and the envelope blooms open to reveal
 * a personal message and a photo.
 */
export default function Surprise({ surprise }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [open, setOpen] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => confettiRef.current?.burst(90), 700);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <section ref={ref} className={`chapter surprise ${inView ? 'is-visible' : ''}`} aria-label="A surprise for you">
      {!open && (
        <div className="surprise-inner">
          <p className="chapter-kicker reveal-up">but wait…</p>
          <h2 className="chapter-title reveal-up">there’s one more thing</h2>
          <button className="sealed-card reveal-up" onClick={() => setOpen(true)} aria-label="Open the surprise">
            <span className="sealed-card-shine" aria-hidden="true" />
            <span className="sealed-card-label">{surprise.buttonLabel}</span>
            <span className="sealed-card-sub">go on, you know you want to</span>
          </button>
        </div>
      )}

      {open && (
        <div className="surprise-open">
          <div className="surprise-dim" aria-hidden="true" />
          <Particles intensity={0.9} />
          <Confetti ref={confettiRef} />
          <div className="envelope-scene">
            <div className="envelope">
              <div className="env-body" aria-hidden="true" />
              <div className="env-flap" aria-hidden="true" />
              <div className="env-letter">
                <h3>{surprise.title}</h3>
                <p>{surprise.message}</p>
                {surprise.image && (
                  <div className="env-photo">
                    <img src={surprise.image} alt="A surprise memory" loading="lazy" />
                  </div>
                )}
              </div>
            </div>
            <button className="ghost-btn" onClick={() => setOpen(false)}>
              fold it back up
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
