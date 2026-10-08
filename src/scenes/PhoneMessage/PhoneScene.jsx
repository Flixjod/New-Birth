import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import Grain from '../../components/Effects/Grain';
import { isMobile } from '../../utils/device';
import { phoneEnter } from '../../animations/phone/phoneEnter';
import { phoneExit } from '../../animations/phone/phoneExit';
import IPhone from './IPhone';
import PhoneScreen from './PhoneScreen';
import StatusBar from './StatusBar';
import Conversation from './Conversation';
import MessageComposer from './MessageComposer';
import SendAnimation from './SendAnimation';
import LoveMessage from './LoveMessage';
import './PhoneMessage.css';

const DEFAULT_DELAY = 1600;
const TYPING_MS = 1100;

/**
 * Normalize the phoneMessages config: accepts the spec shape
 * { recipient, messages: [...] } or a bare array of messages.
 */
function asList(pm) {
  if (Array.isArray(pm)) return pm;
  if (pm && Array.isArray(pm.messages)) return pm.messages;
  return [];
}

/**
 * Incoming thread: phoneMessages entries of type "text"
 * (entries with type "sent" are the outgoing reply instead).
 * Falls back to config-derived lines only — never hardcoded text.
 */
function getIncoming(config) {
  const list = asList(config?.phoneMessages);
  const incoming = list
    .filter((m) => m && m.type !== 'sent' && typeof m.text === 'string' && m.text.trim())
    .map((m) => ({ text: m.text, delay: typeof m.delay === 'number' ? m.delay : DEFAULT_DELAY }));
  if (incoming.length > 0) return incoming;
  const intro = Array.isArray(config?.messageIntro) ? config.messageIntro.filter(Boolean) : [];
  if (intro.length > 0) return intro.map((text) => ({ text, delay: DEFAULT_DELAY }));
  const firstLine =
    typeof config?.message === 'string' ? config.message.split('\n').map((s) => s.trim()).filter(Boolean)[0] : '';
  return firstLine ? [{ text: firstLine, delay: DEFAULT_DELAY }] : [];
}

/**
 * The outgoing reply. Precedence: a phoneMessages entry with
 * type "sent" → config.phoneReply → config.letter.madeWith.
 */
function getOutgoing(config) {
  const list = asList(config?.phoneMessages);
  const sent = list.find((m) => m && m.type === 'sent' && typeof m.text === 'string' && m.text.trim());
  if (sent) return sent.text;
  if (typeof config?.phoneReply === 'string' && config.phoneReply.trim()) return config.phoneReply;
  if (config?.letter && typeof config.letter.madeWith === 'string') return config.letter.madeWith;
  return '';
}

/**
 * PhoneScene — cinematic mini-film, timed sequence:
 * black → purple spark → phone fades in (phoneEnter) → screen wakes →
 * conversation opens → typing dots → incoming bubbles (each message's
 * own delay) → composer → SEND → send burst ("Delivered ✦") → phone
 * recedes (phoneExit) → reply expands into handwritten type → onNext().
 */
export default function PhoneScene({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const [stage, setStage] = useState('black'); // black → phone → wake → chat → compose → sending → love
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  const doneRef = useRef(false);
  const timersRef = useRef([]);

  const incoming = useMemo(() => getIncoming(config), [config]);
  const outgoing = useMemo(() => getOutgoing(config), [config]);

  const advance = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onNext();
  }, [onNext]);

  const startSend = useCallback(() => {
    setStage((s) => (s === 'compose' ? 'sending' : s));
  }, []);

  // Timed sequence. All timers tracked and cleared on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    const after = (ms, fn) => timers.push(setTimeout(fn, ms));
    const S = reduced ? 0.22 : 1; // time compression for reduced motion
    let t = 0;

    after((t += 1100 * S), () => setStage('phone')); // phoneEnter silhouette
    after((t += 1600 * S), () => setStage('wake')); // screen wakes
    after((t += 1200 * S), () => setStage('chat')); // conversation opens

    incoming.forEach((m, i) => {
      after((t += (i === 0 ? 900 : m.delay) * S), () => setTyping(true));
      after((t += (reduced ? 350 : TYPING_MS)), () => {
        setTyping(false);
        setVisibleCount(i + 1);
      });
    });

    after((t += 1500 * S), () => setStage('compose')); // composer appears
    after((t += 2400 * S), () => setStage((s) => (s === 'compose' ? 'sending' : s))); // auto SEND

    return () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
    };
  }, [incoming, reduced]);

  const lit = stage !== 'black' && stage !== 'phone';
  const inChat = stage === 'chat' || stage === 'compose' || stage === 'sending';
  const receding = stage === 'love';

  return (
    <div className="ph-scene">
      <div className={`ph-ambient${stage !== 'black' ? ' ph-ambient--wide' : ''}`} aria-hidden />

      {!reduced && (
        <ParticleField count={mobile ? 22 : 55} color="#7c3aed" className="ph-dust" />
      )}

      <Vignette />
      <Grain />

      <motion.div
        className="ph-phone"
        variants={{ ...phoneEnter, ...phoneExit }}
        initial="hidden"
        animate={receding ? 'exit' : 'visible'}
      >
        <IPhone>
          <PhoneScreen lit={lit}>
            {inChat && (
              <>
                <StatusBar />
                <Conversation
                  messages={incoming}
                  visibleCount={visibleCount}
                  typing={typing && stage === 'chat'}
                />
                <AnimatePresence>
                  {stage === 'compose' && (
                    <MessageComposer key="composer" text={outgoing} onSend={startSend} />
                  )}
                </AnimatePresence>
                {stage === 'sending' && (
                  <SendAnimation text={outgoing} onDone={() => setStage('love')} />
                )}
              </>
            )}
          </PhoneScreen>
        </IPhone>
      </motion.div>

      {stage === 'love' && <LoveMessage text={outgoing} onDone={advance} />}

      <Button variant="ghost" className="ph-skip" onClick={advance}>
        Skip
      </Button>
    </div>
  );
}
