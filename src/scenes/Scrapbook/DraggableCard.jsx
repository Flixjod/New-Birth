import { useState } from 'react';
import { motion } from 'framer-motion';
import { dragTransition } from '../../animations/scrapbook/drag';
import { cardLift } from '../../animations/scrapbook/cardLift';
import { cardSettle } from '../../animations/scrapbook/cardSettle';

/**
 * DraggableCard — a framer-motion drag wrapper for scrapbook cards.
 * Position + static rotation live on the outer div so the motion
 * variants (lift / settle) never clobber the card's scattered angle.
 */
export default function DraggableCard({
  pos,
  rotate = 0,
  index = 0,
  onRelease,
  reduceMotion = false,
  children,
}) {
  const [dragging, setDragging] = useState(false);
  const [raised, setRaised] = useState(false);

  return (
    <div
      className="sbk-draggable-pos"
      style={{
        left: pos?.left,
        top: pos?.top,
        transform: `rotate(${rotate}deg)`,
        zIndex: raised ? 80 : 10 + index,
      }}
    >
      <motion.div
        className="sbk-draggable"
        drag
        dragTransition={dragTransition}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          setDragging(true);
          setRaised(true);
        }}
        onDragEnd={(_, info) => {
          setDragging(false);
          setRaised(false);
          onRelease?.(index, info.offset);
        }}
        variants={{ rest: { scale: 1 }, lift: cardLift, settle: cardSettle }}
        initial="rest"
        animate={reduceMotion ? 'rest' : dragging ? 'lift' : 'settle'}
        whileTap={{ cursor: 'grabbing' }}
        style={{ touchAction: 'none' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
