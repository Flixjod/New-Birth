const NOISE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.6'/></svg>";

/** Film grain overlay. Props: opacity. */
export default function Grain({ opacity = 0.07, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`nb-grain ${className}`}
      style={{ opacity, backgroundImage: `url("${NOISE}")` }}
    />
  );
}
