import { useInView } from '../hooks/useInView';

/** Words fade up one after another once the paragraph scrolls into view. */
function ProgressiveParagraph({ text, baseDelay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const words = text.split(/\s+/);
  return (
    <p ref={ref} className={`progressive ${inView ? 'is-visible' : ''}`}>
      {words.map((w, i) => (
        <span
          key={i}
          className="pw"
          style={{ transitionDelay: `${baseDelay + i * 28}ms` }}
        >
          {w}
          {'\u00A0'}
        </span>
      ))}
    </p>
  );
}

function Reasons({ reasons }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div ref={ref} className={`reasons ${inView ? 'is-visible' : ''}`}>
      <h3 className="reasons-title">a few of a million reasons</h3>
      <div className="reasons-grid">
        {reasons.map((r, i) => (
          <div key={r} className="reason-card" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="reason-num">{String(i + 1).padStart(2, '0')}</span>
            <p>{r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The personal message chapter — elegant typography,
 * lines unfolding like a film monologue.
 */
export default function Message({ introLines, message, reasons }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`chapter message ${inView ? 'is-visible' : ''}`} aria-label="A personal message">
      <div className="message-inner">
        <p className="chapter-kicker reveal-up">a few words, just for you</p>
        {introLines.map((line, i) => (
          <h2
            key={line}
            className="message-intro reveal-up"
            style={{ transitionDelay: `${200 + i * 250}ms` }}
          >
            {line}
          </h2>
        ))}

        <div className="message-body">
          {message.split('\n\n').map((para, i) => (
            <ProgressiveParagraph key={i} text={para.trim()} baseDelay={i * 150} />
          ))}
        </div>

        <Reasons reasons={reasons} />
      </div>
    </section>
  );
}
