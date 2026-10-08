/** Small circular icon button (back chevron, close, etc.). */

export default function IconButton({ label, className = '', children, ...rest }) {
  return (
    <button className={`nb-icon-btn ${className}`} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
