/**
 * PhoneScreen — the glass screen. `lit` wakes the display:
 * a violet wallpaper fades in and the dark lock veil lifts.
 */
export default function PhoneScreen({ lit, children }) {
  return (
    <div className={`ph-screen${lit ? ' ph-screen--lit' : ''}`}>
      <div className="ph-wallpaper" aria-hidden />
      <div className={`ph-lockveil${lit ? ' ph-lockveil--gone' : ''}`} aria-hidden />
      {lit && children}
    </div>
  );
}
