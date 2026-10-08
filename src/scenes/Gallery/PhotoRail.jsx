import { forwardRef } from 'react';
import Polaroid from './Polaroid';

/**
 * PhotoRail — horizontal snap-scroll row of Polaroids.
 */
const PhotoRail = forwardRef(function PhotoRail(
  { memories, onOpen, reduceMotion = false },
  ref
) {
  return (
    <div className="gal-rail-wrap">
      <div className="gal-rail" ref={ref}>
        {memories.map((m, i) => (
          <Polaroid
            key={`${m.image || 'memory'}-${i}`}
            memory={m}
            index={i}
            onClick={() => onOpen(i)}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <p className="gal-rail-hint">swipe through the moments</p>
    </div>
  );
});

export default PhotoRail;
