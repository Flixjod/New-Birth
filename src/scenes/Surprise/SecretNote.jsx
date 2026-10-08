import { motion } from 'framer-motion';

/**
 * SecretNote — the revealed surprise: title, message and an optional
 * photo. The photo sits on a gradient placeholder and hides itself
 * gracefully if the image is missing, so the note still looks
 * intentional without one.
 */
export default function SecretNote({ title, message, image, reduced = false }) {
  const hideImg = (e) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.article
      className="sur-note"
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0.4 }
          : { duration: 1.6, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <span className="sur-note-mark" aria-hidden="true">✦</span>

      {title && <h2 className="sur-note-title">{title}</h2>}

      {image && (
        <div className="sur-note-photo" aria-hidden={!image}>
          <span className="sur-note-photo-fallback" aria-hidden="true">✦</span>
          <img
            src={image}
            alt=""
            className="sur-note-img"
            loading="lazy"
            onError={hideImg}
          />
        </div>
      )}

      {message && <p className="sur-note-message">{message}</p>}

      {!title && !message && (
        <p className="sur-note-message sur-note-empty">
          Some surprises are still being wrapped…
        </p>
      )}
    </motion.article>
  );
}
