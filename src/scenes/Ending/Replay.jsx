import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fade } from '../../animations/transitions/fade';
import Button from '../../components/UI/Button';
import './Ending.css';

export default function Replay({ onReplay, onPrev }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="end-replay"
      variants={fade}
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      transition={{ delay: reduceMotion ? 0 : 2.8, duration: 1.6 }}
    >
      <Button variant="ghost" onClick={onReplay} className="end-replay-btn">
        Replay the story
      </Button>
      <span className="end-separator" aria-hidden="true">
        ·
      </span>
      <Button variant="ghost" onClick={onPrev} className="end-replay-btn">
        Back
      </Button>
    </motion.div>
  );
}
