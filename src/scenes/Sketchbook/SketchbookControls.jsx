import Button from '../../components/UI/Button';

/**
 * Prev / next arrows plus clickable page dots.
 * Props: index, total, onPrev, onNext, onGo(i), disabled.
 */
export default function SketchbookControls({ index, total, onPrev, onNext, onGo, disabled = false }) {
  return (
    <div className="skb-controls">
      <Button
        variant="ghost"
        onClick={onPrev}
        className={`skb-ctrl-btn${index === 0 || disabled ? ' is-disabled' : ''}`}
      >
        ‹
      </Button>
      <div className="skb-dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`skb-dot${i === index ? ' is-active' : ''}`}
            onClick={() => onGo(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={onNext}
        className={`skb-ctrl-btn${index === total - 1 || disabled ? ' is-disabled' : ''}`}
      >
        ›
      </Button>
    </div>
  );
}
