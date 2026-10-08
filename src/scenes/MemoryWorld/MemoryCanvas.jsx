import FloatingPhoto from './FloatingPhoto';

/**
 * MemoryCanvas — the perspective stage holding the floating photos.
 * Photos are positioned by their memory x (vw) / y (vh); depth (z) and
 * rotation live on the FloatingPhoto itself. The 3D chain is:
 * .mw-camera (perspective) → .mw-canvas → .mw-photo-slot → .mw-photo,
 * all with transform-style: preserve-3d.
 */
export default function MemoryCanvas({ memories, dimAll, onFocus }) {
  return (
    <div className="mw-canvas">
      {memories.map((m, i) => (
        <div
          key={i}
          className="mw-photo-slot"
          style={{ left: `calc(50% + ${m.x}vw)`, top: `calc(50% + ${m.y}vh)` }}
        >
          <FloatingPhoto
            memory={m}
            index={i}
            dimmed={dimAll}
            onFocus={() => onFocus(i)}
          />
        </div>
      ))}
    </div>
  );
}
