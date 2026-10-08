/**
 * StatusBar — fictional, generic status bar.
 * Signal dots + battery only; no clock, no carrier branding.
 */
export default function StatusBar() {
  return (
    <div className="ph-statusbar" aria-hidden>
      <div className="ph-signal">
        <span className="ph-sigdot" />
        <span className="ph-sigdot" />
        <span className="ph-sigdot" />
        <span className="ph-sigdot" />
      </div>
      <div className="ph-battery">
        <span className="ph-battery-fill" />
      </div>
    </div>
  );
}
