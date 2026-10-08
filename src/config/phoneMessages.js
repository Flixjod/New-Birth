/**
 * New-Birth · phoneMessages — the iPhone love-message scene.
 *
 * The thread types out message by message with natural pauses
 * (`delay` ms). The entry with type "sent" is the final message —
 * it gets the SEND animation, the "Delivered ✦" burst, and expands
 * into the handwritten love message that closes the scene.
 */

export const loveMessage = {
  recipient: 'My Love',
  messages: [
    {
      type: 'text',
      text: 'Happy Birthday, my love ❤️',
      delay: 900,
    },
    {
      type: 'text',
      text: 'I made something special for you.',
      delay: 1700,
    },
    {
      type: 'text',
      text: 'Every pixel of it is yours.',
      delay: 1500,
    },
    {
      type: 'sent',
      text: 'I hope you love it as much as I love you.',
      delay: 1600,
    },
  ],
};
