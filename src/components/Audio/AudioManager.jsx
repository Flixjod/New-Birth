import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const AudioCtx = createContext(null);

/**
 * AudioManager — owns all story audio behind one context.
 * - Respects config.audio.enabled (renders nothing audible when off).
 * - unlock() must be called from a user gesture (mobile autoplay rules);
 *   Experience calls it on the first pointerdown/keydown.
 * - playCue('midnight' | 'message') fires one-shot scene cues.
 * Missing audio files fail silently — the story never breaks.
 */
export function AudioProvider({ config, children }) {
  const audioCfg = config.audio || {};
  const enabled = !!audioCfg.enabled;
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const mainRef = useRef(null);

  const startMain = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    el.volume = audioCfg.volume ?? 0.35;
    el.play().then(() => setPlaying(true)).catch(() => {});
  }, [audioCfg.volume]);

  const unlock = useCallback(() => {
    setUnlocked((was) => {
      if (!was && enabled) {
        // Defer one tick so the <audio> element exists.
        setTimeout(startMain, 0);
      }
      return true;
    });
  }, [enabled, startMain]);

  const toggle = useCallback(async () => {
    const el = mainRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        /* blocked — user can retry */
      }
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const playCue = useCallback(
    (name) => {
      if (!enabled || !unlocked) return;
      const src = audioCfg.tracks?.[name];
      if (!src) return;
      const a = new Audio(src);
      a.volume = (audioCfg.volume ?? 0.35) * 0.9;
      a.play().catch(() => {});
    },
    [enabled, unlocked, audioCfg],
  );

  const value = useMemo(
    () => ({ enabled, unlocked, playing, unlock, toggle, playCue }),
    [enabled, unlocked, playing, unlock, toggle, playCue],
  );

  return (
    <AudioCtx.Provider value={value}>
      {enabled && (
        <audio
          ref={mainRef}
          src={audioCfg.tracks?.main || audioCfg.src}
          loop
          preload="auto"
          aria-hidden="true"
        />
      )}
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>');
  return ctx;
}
