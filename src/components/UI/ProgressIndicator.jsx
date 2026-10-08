/** Minimal story-progress dots. Decorative, not navigation. */

export default function ProgressIndicator({ index, total }) {
  return (
    <div className="nb-progress" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={i === index ? 'is-active' : i < index ? 'is-done' : ''}
        />
      ))}
    </div>
  );
}
