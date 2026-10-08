import Polaroid from './Polaroid';

/**
 * PhotoStack — a fanned stack teaser of the first few memories.
 * Tapping the stack opens the first photo fullscreen.
 */
export default function PhotoStack({ memories, onOpen, reduceMotion = false }) {
  const stack = memories.slice(0, 4);

  const openFirst = () => onOpen(0);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFirst();
    }
  };

  return (
    <div className="gal-stack-wrap">
      <div
        className="gal-stack"
        role="button"
        tabIndex={0}
        onClick={openFirst}
        onKeyDown={onKey}
        aria-label="Open photo memories"
      >
        {stack.map((m, i) => (
          <div key={`${m.image || 'memory'}-${i}`} className={`gal-stack-slot gal-stack-slot-${i}`}>
            <Polaroid memory={m} index={i} reduceMotion={reduceMotion} />
          </div>
        ))}
      </div>
      <p className="gal-stack-hint">a few favorites — tap to open</p>
    </div>
  );
}
