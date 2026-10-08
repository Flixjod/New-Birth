import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCamera from './MemoryCamera';
import MemoryCanvas from './MemoryCanvas';
import FloatingPhoto from './FloatingPhoto';
import PhotoDepth from './PhotoDepth';
import MemoryParticles from './MemoryParticles';
import MemoryLightTrails from './MemoryLightTrails';
import Button from '../../components/UI/Button';
import IconButton from '../../components/UI/IconButton';
import Glow from '../../components/Effects/Glow';
import Vignette from '../../components/Effects/Vignette';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';
import { preloadImages } from '../../utils/preloadImages';
import './MemoryWorld.css';

/**
 * Normalize config memories into positioned photo records.
 * Honors explicit position/rotation/caption when present; otherwise lays
 * photos out in a deterministic scatter so the scene works with the
 * plain { image, date, note } shape too.
 */
function layoutMemories(list) {
  return list.map((m, i) => {
    const pos = m.position || {};
    return {
      image: m.image,
      caption: m.caption ?? m.note ?? m.date ?? '',
      x: pos.x ?? ((i * 53) % 76) - 38, // vw
      y: pos.y ?? ((i * 37) % 52) - 26, // vh
      z: pos.z ?? -((i * 137) % 320), // px (0 … -320)
      rotation: m.rotation ?? ((i * 29) % 26) - 13, // deg
    };
  });
}

/**
 * MemoryWorld ★ — signature scene. A dark 3D void of floating memories.
 * The camera drifts with the pointer (desktop) or drag (touch); tapping a
 * photo brings it toward the viewer while the world blurs behind it.
 */
export default function MemoryWorld({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();
  const raw = useMemo(
    () => (Array.isArray(config?.memories) ? config.memories.filter(Boolean) : []),
    [config]
  );
  const memories = useMemo(() => {
    const laid = layoutMemories(raw);
    return mobile ? laid.slice(0, 5) : laid;
  }, [raw, mobile]);

  const [focused, setFocused] = useState(null);
  const focusedMemory = focused !== null ? memories[focused] : null;

  useEffect(() => {
    preloadImages(memories.map((m) => m.image).filter(Boolean)).catch(() => {});
  }, [memories]);

  return (
    <div className="mw-root">
      <MemoryParticles />
      <MemoryLightTrails />
      <Glow className="mw-glow" />

      <MemoryCamera>
        <MemoryCanvas memories={memories} dimAll={focused !== null} onFocus={setFocused} />
      </MemoryCamera>

      <Vignette className="mw-vignette" />

      <PhotoDepth active={focused !== null} onClose={() => setFocused(null)} />

      <AnimatePresence>
        {focusedMemory && (
          <motion.div
            className="mw-focus-layer"
            key="focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.4 }}
          >
            <FloatingPhoto
              memory={focusedMemory}
              focused
              large
              onClose={() => setFocused(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mw-back">
        <IconButton label="Back" onClick={onPrev}>
          ‹
        </IconButton>
      </div>

      {memories.length === 0 ? (
        <div className="mw-empty">
          <h2 className="mw-empty-title">The stars are gathering</h2>
          <p className="mw-empty-sub">
            The memories haven&rsquo;t arrived yet — when they do, they&rsquo;ll float here,
            waiting to be stepped into.
          </p>
          <Button variant="ghost" onClick={onNext}>
            continue ✦
          </Button>
        </div>
      ) : (
        <>
          {focused === null && <p className="mw-hint">tap a memory to step closer</p>}
          <div className="mw-continue">
            <Button variant="ghost" onClick={onNext}>
              continue ✦
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
