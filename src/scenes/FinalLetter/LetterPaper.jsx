import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { fadeUp } from '../../animations/transitions/fade';
import './FinalLetter.css';

function Paragraphs({ body }) {
  if (!body) return null;
  const paras = Array.isArray(body) ? body : [body];
  return paras
    .filter((p) => typeof p === 'string' && p.trim().length > 0)
    .map((p, i) => (
      <motion.p key={i} className="fl-body" variants={fadeUp}>
        {p}
      </motion.p>
    ));
}

export default function LetterPaper({ letter }) {
  const reduceMotion = useReducedMotion();
  const safeLetter = letter || {};

  return (
    <motion.article
      className="fl-paper"
      variants={fadeUp}
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      aria-label="Letter"
    >
      {safeLetter.greeting && (
        <motion.h3 className="fl-greeting" variants={fadeUp}>
          {safeLetter.greeting}
        </motion.h3>
      )}
      <Paragraphs body={safeLetter.body} />
      {safeLetter.signoff && (
        <motion.p className="fl-signoff" variants={fadeUp}>
          {safeLetter.signoff}
        </motion.p>
      )}
    </motion.article>
  );
}
