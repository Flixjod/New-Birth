/** Cinematic buttons. Variants: "primary" | "ghost". */

export default function Button({ variant = 'primary', className = '', children, ...rest }) {
  return (
    <button className={`nb-btn nb-btn-${variant} ${className}`} {...rest}>
      <span className="nb-btn-label">{children}</span>
    </button>
  );
}
