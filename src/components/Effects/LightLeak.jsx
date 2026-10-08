/** A slow diagonal light-leak sweep. Pure decoration. */
export default function LightLeak({ className = '' }) {
  return <div aria-hidden="true" className={`nb-lightleak ${className}`} />;
}
