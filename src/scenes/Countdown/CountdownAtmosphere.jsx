import Bokeh from '../../components/Effects/Bokeh';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isMobile } from '../../utils/device';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The countdown's atmosphere: bokeh, drifting particles, a violet nebula and
 * a vignette. `total` (ms remaining) deepens the mood as midnight nears —
 * brighter and denser in the final stretch.
 */
export default function CountdownAtmosphere({ total }) {
  const reduceMotion = useReducedMotion();

  const remaining = typeof total === 'number' && total > 0 ? total : 0;
  const closeness = remaining <= 0 ? 1 : Math.min(1, Math.max(0, 1 - remaining / ONE_DAY_MS));
  const intensity = 0.35 + 0.65 * closeness;

  const particleCount = reduceMotion
    ? 0
    : Math.round((isMobile() ? 18 : 36) + (isMobile() ? 30 : 70) * closeness);

  return (
    <div
      className="cd-atmosphere"
      style={{ opacity: intensity }}
      aria-hidden="true"
    >
      <div className="cd-nebula" />
      <Bokeh />
      <ParticleField count={particleCount} color="#c4b5fd" />
      <Vignette />
    </div>
  );
}
