import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import Grain from '../../components/Effects/Grain';
import { isMobile } from '../../utils/device';
import { rand, randInt } from '../../utils/random';
import DraggableCard from './DraggableCard';
import MemoryCard from './MemoryCard';
import HiddenNote from './HiddenNote';
import StickerLayer from './StickerLayer';
import './Scrapbook.css';

const REVEAL_DISTANCE = 90;

/** A sealed note (config.sealedNote) — tap to open, tap to close again. */
function SealedNote({ sealed, reduceMotion }) {
  const [open, setOpen] = useState(false);
  if (!sealed || (!sealed.front && !sealed.inside)) return null;

  return (
    <div className="sbk-sealed-pos">
      <motion.button
        type="button"
        className={`sbk-sealed${open ? ' is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        aria-expanded={open}
        aria-label="A sealed note — tap to open"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="inside"
              className="sbk-sealed-inside"
              initial={{ opacity: 0, rotateX: -60 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.35 }}
            >
              {sealed.inside}
            </motion.span>
          ) : (
            <motion.span
              key="front"
              className="sbk-sealed-front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sealed.front}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

/**
 * Scrapbook — a freeform dark-table corkboard. Memory polaroids are
 * draggable; a hidden note waits behind one of the cards; a sealed note
 * and handwritten notes are scattered around. Discoverable, not tutorialized.
 */
export default function Scrapbook({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const mobile = isMobile();
  const memories = config?.memories ?? [];
  const visibleNotes = (config?.notes ?? []).filter((n) => !n.hidden).slice(0, 4);
  const hiddenNotes = (config?.notes ?? []).filter((n) => n.hidden);

  // The hidden note lives behind this card until it is dragged away.
  const anchorIdx = memories.length > 1 ? 1 : 0;
  const [offsets, setOffsets] = useState({});

  const layout = useMemo(
    () =>
      memories.map((_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const rows = Math.max(1, Math.ceil(memories.length / 2));
        return {
          left: `${6 + col * 46 + rand(-3, 3)}%`,
          top: `${4 + row * (74 / rows) + rand(-2, 2)}%`,
          rotate: reduceMotion ? randInt(-2, 2) : randInt(-8, 8),
        };
      }),
    [memories.length, reduceMotion]
  );

  const noteSpots = useMemo(
    () => [
      { left: '5%', top: '1%', rotate: -6 },
      { left: '70%', top: '0%', rotate: 5 },
      { left: '3%', top: '86%', rotate: 4 },
      { left: '68%', top: '88%', rotate: -5 },
    ],
    []
  );

  const handleRelease = (index, offset) => {
    setOffsets((prev) => ({ ...prev, [index]: offset }));
  };

  const anchorOffset = offsets[anchorIdx];
  const revealed =
    hiddenNotes.length > 0 &&
    !!anchorOffset &&
    Math.hypot(anchorOffset.x, anchorOffset.y) > REVEAL_DISTANCE;

  const hiddenStyle =
    layout[anchorIdx] && hiddenNotes[0]
      ? {
          left: layout[anchorIdx].left,
          top: layout[anchorIdx].top,
          transform: 'translate(30px, 34px) rotate(3deg)',
        }
      : undefined;

  return (
    <section className="sbk-scene">
      <ParticleField count={mobile ? 20 : 45} color="#8b5cf6" />
      <Vignette />
      <Grain />
      <StickerLayer />

      <motion.header
        className="sbk-head"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: 'easeOut' }}
      >
        <Button variant="ghost" onClick={onPrev} className="sbk-back">
          ‹ Back
        </Button>
        <p className="sbk-eyebrow">the scrapbook</p>
        <h2 className="sbk-title">little moments, kept forever</h2>
        <p className="sbk-hint">psst… some things like to be moved</p>
      </motion.header>

      <div className="sbk-board">
        {hiddenStyle && (
          <HiddenNote
            note={hiddenNotes[0]}
            style={hiddenStyle}
            revealed={revealed}
            reduceMotion={reduceMotion}
          />
        )}

        {memories.map((m, i) => (
          <DraggableCard
            key={`${m.image || 'memory'}-${i}`}
            pos={layout[i]}
            rotate={layout[i]?.rotate ?? 0}
            index={i}
            onRelease={handleRelease}
            reduceMotion={reduceMotion}
          >
            <MemoryCard memory={m} />
          </DraggableCard>
        ))}

        {memories.length === 0 && (
          <div className="sbk-empty-pos">
            <div className="sbk-empty">
              <span className="sbk-tape" aria-hidden="true" />
              <p>memories are on their way…</p>
            </div>
          </div>
        )}

        {visibleNotes.map((n, i) => {
          const spot = noteSpots[i % noteSpots.length];
          return (
            <div
              key={i}
              className="sbk-note-pos"
              style={{
                left: spot.left,
                top: spot.top,
                transform: `rotate(${reduceMotion ? 0 : spot.rotate}deg)`,
              }}
            >
              <p className="sbk-note">
                <span className="sbk-tape" aria-hidden="true" />
                {n.text}
              </p>
            </div>
          );
        })}

        <SealedNote sealed={config?.sealedNote} reduceMotion={reduceMotion} />
      </div>

      <footer className="sbk-foot">
        <Button variant="primary" onClick={onNext} className="sbk-continue">
          Continue
        </Button>
      </footer>
    </section>
  );
}
