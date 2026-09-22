import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks/useInView';

/**
 * One draggable polaroid. Pointer Events + setPointerCapture make it
 * work identically for mouse and touch. While dragging the card lifts,
 * tilts with velocity and casts a deeper shadow; on release it settles
 * with a soft spring.
 */
function MemoryCard({ memory, index, slot, total, bringToFront }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [z, setZ] = useState(10 + index);
  const drag = useRef(null);
  const reduced = useReducedMotion();

  const onPointerDown = (e) => {
    if (reduced) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setZ(bringToFront());
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
    };
    setDragging(true);
    setZ(1000);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.vel = 0.85 * d.vel + 0.15 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = now;
    setPos({ x: d.baseX + dx, y: d.baseY + dy });
    setRot(Math.max(-14, Math.min(14, d.vel * 28)));
  };

  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
    setRot(0);
  };

  return (
    <figure
      ref={ref}
      className={`memory-card ${dragging ? 'is-dragging' : ''} slot-${index % total}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${dragging ? rot : slot.rotate}deg)`,
        zIndex: z,
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="tape" aria-hidden="true" />
      <div className="memory-photo">
        <img src={memory.image} alt={memory.note} loading="lazy" draggable="false" />
      </div>
      <figcaption>
        <span className="memory-date">{memory.date}</span>
        <span className="memory-note">“{memory.note}”</span>
      </figcaption>
    </figure>
  );
}

/** A sealed note — tap to flip it open. */
function SealedNote({ sealedNote }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className={`sealed-note ${open ? 'is-open' : ''}`}
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? 'Close the hidden note' : 'Open the hidden note'}
    >
      <span className="sealed-front">{sealedNote.front}</span>
      <span className="sealed-inside">{sealedNote.inside}</span>
    </button>
  );
}

const SLOTS = [
  { rotate: -6 },
  { rotate: 5 },
  { rotate: -3 },
  { rotate: 7 },
  { rotate: -8 },
  { rotate: 4 },
];

/**
 * Interactive memory scrapboard — photos scattered like a real table,
 * draggable on touch and mouse, handwritten notes tucked around them,
 * a sealed note waiting to be found.
 */
export default function Scrapbook({ memories, notes, sealedNote }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const zTop = useRef(100);
  const bringToFront = () => {
    zTop.current += 1;
    return zTop.current;
  };

  const visibleNotes = notes.filter((n) => !n.hidden);
  const hiddenNotes = notes.filter((n) => n.hidden);

  return (
    <section ref={ref} className={`chapter scrapbook ${inView ? 'is-visible' : ''}`} aria-label="Memory scrapbook">
      <div className="scrapbook-inner">
        <p className="chapter-kicker reveal-up">little pieces of us</p>
        <h2 className="chapter-title reveal-up">The Memory Board</h2>
        <p className="chapter-sub reveal-up">go on — pick them up, move them around. they’re yours.</p>

        <div className="board" aria-label="Draggable memory board">
          {memories.map((m, i) => (
            <MemoryCard
              key={m.image + i}
              memory={m}
              index={i}
              total={memories.length}
              slot={SLOTS[i % SLOTS.length]}
              bringToFront={bringToFront}
            />
          ))}

          {visibleNotes.map((n, i) => (
            <span key={i} className={`hand-note hn-${i % 5}`}>
              {n.text}
            </span>
          ))}

          {/* hidden notes sit *under* the cards — drag a card away to find them */}
          {hiddenNotes.map((n, i) => (
            <span key={`h-${i}`} className={`hand-note is-hidden hn-hidden-${i}`}>
              ✦ {n.text}
            </span>
          ))}

          <SealedNote sealedNote={sealedNote} />
        </div>

        <p className="board-hint">tip: some notes are hiding behind the photos…</p>
      </div>
    </section>
  );
}
