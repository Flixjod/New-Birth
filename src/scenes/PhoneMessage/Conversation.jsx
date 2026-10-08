import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

/**
 * Conversation — chat header + the incoming message thread.
 * Renders the first `visibleCount` messages and a typing
 * indicator while the next one is being "written".
 */
export default function Conversation({ messages, visibleCount, typing }) {
  return (
    <div className="ph-chat">
      <div className="ph-chat-header">
        <div className="ph-avatar" aria-hidden>
          ✦
        </div>
        <div>
          <div className="ph-chat-name">Special Delivery</div>
          <div className="ph-chat-sub">just now</div>
        </div>
      </div>
      <div className="ph-bubbles">
        {messages.slice(0, visibleCount).map((m, i) => (
          <MessageBubble key={i} text={m.text} />
        ))}
        {typing && <TypingIndicator />}
      </div>
    </div>
  );
}
