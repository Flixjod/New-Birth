import { useAudio } from './AudioManager';

/** Floating music toggle — only rendered when audio is enabled. */
export default function MusicToggle() {
  const { enabled, playing, toggle } = useAudio();
  if (!enabled) return null;

  return (
    <button
      className={`nb-music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="nb-music-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
