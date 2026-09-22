import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Cinematic gallery: a horizontal swipe of polaroids.
 * The active photo resolves blurred → sharp, scales gently,
 * and its caption fades in under a soft purple glow.
 */
export default function Gallery({ memories }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const slidesRef = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.dataset.index);
            setActive(i);
          }
        });
      },
      { root: track, threshold: 0.6 },
    );
    slidesRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [memories.length]);

  return (
    <section ref={ref} className={`chapter gallery ${inView ? 'is-visible' : ''}`} aria-label="Memory gallery">
      <div className="gallery-inner">
        <p className="chapter-kicker reveal-up">moments, kept safe</p>
        <h2 className="chapter-title reveal-up">The Gallery</h2>
        <p className="chapter-sub reveal-up">swipe slowly — some memories deserve a second look</p>
      </div>

      <div ref={trackRef} className="gallery-track">
        {memories.map((m, i) => (
          <div
            key={m.image + i}
            data-index={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className={`gallery-slide ${active === i ? 'is-active' : ''}`}
          >
            <div className="gallery-frame">
              <img src={m.image} alt={m.note} loading="lazy" draggable="false" />
              <div className="gallery-glow" aria-hidden="true" />
            </div>
            <div className="gallery-caption">
              <span className="gallery-date">{m.date}</span>
              <p>“{m.note}”</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-dots" aria-hidden="true">
        {memories.map((_, i) => (
          <span key={i} className={`gdot ${active === i ? 'is-active' : ''}`} />
        ))}
      </div>
    </section>
  );
}
