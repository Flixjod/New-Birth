import { useEffect, useRef } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { pad2 } from '../utils/time';
import Particles from './Particles';

/** A single digit that rolls smoothly when its value changes. */
function RollingDigit({ char }) {
  return (
    <span className="digit" aria-hidden="true">
      <span className="digit-strip" key={char}>
        {char}
      </span>
    </span>
  );
}

function Unit({ value, label, twoDigits = true }) {
  const str = twoDigits ? pad2(value) : String(value);
  return (
    <div className="cd-unit">
      <div className="cd-digits">
        {str.split('').map((ch, i) => (
          <RollingDigit key={i} char={ch} />
        ))}
      </div>
      <div className="cd-label">{label}</div>
    </div>
  );
}

/**
 * Live countdown to midnight in the configured timezone.
 * The atmosphere thickens as the moment approaches; the final
 * ten seconds take over the whole screen, 10 → 0, before the reveal.
 */
export default function Countdown({ birthday, timezone, onMidnight }) {
  const { days, hours, minutes, seconds, total, done } = useCountdown(birthday, timezone);
  const firedRef = useRef(false);

  // Atmosphere intensity: 0.35 far away → 1.0 in the final hour.
  const intensity = done
    ? 1
    : total < 3_600_000
      ? 1
      : total < 86_400_000
        ? 0.75
        : 0.45;

  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      // Let the "it's time" beat land, then hand over to the reveal.
      const t = setTimeout(onMidnight, total > -60_000 ? 2600 : 1400);
      return () => clearTimeout(t);
    }
  }, [done, onMidnight, total]);

  const finalTen = !done && total <= 10_000;
  const finalNumber = Math.ceil(total / 1000);

  return (
    <section className="countdown" aria-label="Countdown to midnight">
      <Particles intensity={intensity} />
      <div className="countdown-vignette" style={{ opacity: 0.4 + intensity * 0.6 }} />

      {finalTen ? (
        <div className="cd-final" key={finalNumber}>
          <div className="cd-final-number">{finalNumber}</div>
          <div className="cd-final-sub">the stars are holding their breath</div>
        </div>
      ) : done ? (
        <div className="cd-arrived">
          <p className="cd-arrived-kicker">the clock strikes twelve</p>
          <h2 className="cd-arrived-title">It’s time ✦</h2>
        </div>
      ) : (
        <div className="cd-inner">
          <p className="cd-kicker">something beautiful is on its way</p>
          <h2 className="cd-title">
            Counting down <span className="cd-title-accent">to midnight</span>
          </h2>
          <div className="cd-row" role="timer" aria-live="off">
            <Unit value={days} label="days" twoDigits={false} />
            <span className="cd-sep">·</span>
            <Unit value={hours} label="hours" />
            <span className="cd-sep">·</span>
            <Unit value={minutes} label="minutes" />
            <span className="cd-sep">·</span>
            <Unit value={seconds} label="seconds" />
          </div>
          <p className="cd-hint">stay a little longer — it’s worth it</p>
          <button className="cd-skip" onClick={onMidnight}>
            can’t wait? peek inside →
          </button>
        </div>
      )}

      <div className="intro-grain" aria-hidden="true" />
    </section>
  );
}
