import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import Particles from './Particles';

/**
 * The final letter — cinematic envelope, an unfolding letter,
 * the closing lines, and a peaceful purple night to end on.
 */
export default function FinalLetter({ letter, name, onReplay, onShare }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const [opened, setOpened] = useState(false);

  return (
    <section ref={ref} className={`chapter finale ${inView ? 'is-visible' : ''}`} aria-label="Final letter">
      <Particles intensity={0.5} interactive={false} />

      <div className="finale-inner">
        {!opened ? (
          <>
            <p className="chapter-kicker reveal-up">{letter.teaser}</p>
            <button className="enter-btn reveal-up is-static" onClick={() => setOpened(true)}>
              <span className="enter-btn-ring" />
              <span className="enter-btn-text">{letter.buttonLabel}</span>
            </button>
          </>
        ) : (
          <div className="letter-scene">
            <article className="letter-paper">
              <p className="letter-greeting">{letter.greeting}</p>
              {letter.body.split('\n\n').map((para, i) => (
                <p key={i} className="letter-para" style={{ animationDelay: `${0.9 + i * 0.5}s` }}>
                  {para.trim()}
                </p>
              ))}
              <p className="letter-signoff" style={{ animationDelay: '2.6s' }}>
                {letter.signoff}
                <span className="letter-heart">♥</span>
              </p>
            </article>

            <div className="finale-closing">
              <h2 className="finale-big">{letter.closingTitle}</h2>
              <div className="finale-name">{name}</div>
              <p className="finale-line">“{letter.closingLine}”</p>
              <p className="finale-made">{letter.madeWith}</p>

              <div className="finale-actions">
                <button className="ghost-btn" onClick={onShare}>
                  share this moment ✦
                </button>
                <button className="ghost-btn" onClick={onReplay}>
                  ↺ replay the night
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="intro-grain" aria-hidden="true" />
    </section>
  );
}
