import { useEffect, useState } from 'react';
import Particles from './Particles';

/**
 * Opening cinematic: dark screen, drifting purple particles,
 * lines fade in one by one, then a minimal ENTER ✦.
 */
export default function Intro({ lines, onEnter }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = lines.map((_, i) => setTimeout(() => setStep(i + 1), 1400 + i * 2100));
    const btn = setTimeout(() => setStep(lines.length + 1), 1400 + lines.length * 2100);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(btn);
    };
  }, [lines]);

  return (
    <div className="intro" role="dialog" aria-label="A surprise awaits">
      <Particles intensity={0.45} />
      <div className="intro-vignette" />

      <div className="intro-inner">
        {lines.map((line, i) => (
          <p key={line} className={`intro-line ${step > i ? 'is-visible' : ''}`}>
            {line}
          </p>
        ))}

        <button
          className={`enter-btn ${step > lines.length ? 'is-visible' : ''}`}
          onClick={onEnter}
          aria-label="Enter the experience"
        >
          <span className="enter-btn-ring" />
          <span className="enter-btn-text">ENTER&nbsp;&nbsp;✦</span>
        </button>
      </div>

      <div className="intro-grain" aria-hidden="true" />
    </div>
  );
}
