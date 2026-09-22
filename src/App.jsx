import { useCallback, useEffect, useRef, useState } from 'react';
import { birthdayConfig as cfg } from './config/birthdayConfig';
import Intro from './components/Intro';
import Countdown from './components/Countdown';
import Reveal from './components/Reveal';
import Celebration from './components/Celebration';
import Message from './components/Message';
import Scrapbook from './components/Scrapbook';
import Gallery from './components/Gallery';
import Surprise from './components/Surprise';
import FinalLetter from './components/FinalLetter';
import Particles from './components/Particles';

/** Minimal floating music toggle (only rendered when audio is enabled). */
function MusicToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        /* autoplay blocked — user can try again */
      }
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [audioRef]);

  return (
    <button
      className={`music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="music-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

/**
 * New-Birth — one continuous story:
 * mystery → countdown → midnight reveal → celebration →
 * message → memories → gallery → surprise → final letter.
 */
export default function App() {
  const [phase, setPhase] = useState('intro'); // intro | countdown | reveal | story
  const [toast, setToast] = useState('');
  const audioRef = useRef(null);

  const enter = useCallback(() => {
    setPhase('countdown');
    // Music starts on the user's tap (satisfies mobile autoplay rules).
    if (cfg.audio.enabled && audioRef.current) {
      audioRef.current.volume = cfg.audio.volume;
      audioRef.current.play().catch(() => {});
    }
    window.scrollTo(0, 0);
  }, []);

  const beginReveal = useCallback(() => {
    setPhase('reveal');
    window.scrollTo(0, 0);
  }, []);

  const beginStory = useCallback(() => {
    setPhase('story');
    window.scrollTo(0, 0);
  }, []);

  const replay = useCallback(() => {
    setPhase('intro');
    window.scrollTo(0, 0);
  }, []);

  const share = useCallback(async () => {
    const data = {
      title: `Happy Birthday ${cfg.name} ✦`,
      text: 'Someone made you something beautiful. Open it at midnight. ✦',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* dismissed */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      setToast('link copied — send it with love ✦');
      setTimeout(() => setToast(''), 2600);
    }
  }, []);

  useEffect(() => {
    document.title = `New-Birth ✦ Happy Birthday ${cfg.name}`;
  }, []);

  return (
    <div className="app">
      {cfg.audio.enabled && (
        <audio ref={audioRef} src={cfg.audio.src} loop preload="auto" aria-hidden="true" />
      )}

      {phase === 'intro' && <Intro lines={cfg.introLines} onEnter={enter} />}

      {phase === 'countdown' && (
        <Countdown birthday={cfg.birthday} timezone={cfg.timezone} onMidnight={beginReveal} />
      )}

      {phase === 'reveal' && <Reveal name={cfg.name} onComplete={beginStory} />}

      {phase === 'story' && (
        <main className="story">
          <Celebration name={cfg.name} wish={cfg.wish} />
          <Message introLines={cfg.messageIntro} message={cfg.message} reasons={cfg.reasons} />
          <Scrapbook memories={cfg.memories} notes={cfg.notes} sealedNote={cfg.sealedNote} />
          <Gallery memories={cfg.memories} />
          <Surprise surprise={cfg.surprise} />
          <FinalLetter letter={cfg.letter} name={cfg.name} onReplay={replay} onShare={share} />
        </main>
      )}

      {phase !== 'intro' && cfg.audio.enabled && <MusicToggle audioRef={audioRef} />}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
