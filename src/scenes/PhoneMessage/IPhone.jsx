/**
 * IPhone — fictional, original phone hardware.
 * Frame + reflection only; no branding, no OS clone.
 */
export default function IPhone({ children }) {
  return (
    <div className="ph-device">
      <div className="ph-frame">
        <div className="ph-screenwrap">{children}</div>
        <div className="ph-notch" aria-hidden />
        <div className="ph-reflection" aria-hidden />
      </div>
      <div className="ph-sidebtn ph-sidebtn--top" aria-hidden />
      <div className="ph-sidebtn ph-sidebtn--bottom" aria-hidden />
    </div>
  );
}
