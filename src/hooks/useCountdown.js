import { useEffect, useState } from 'react';
import { getCountdown } from '../utils/countdown';

/** Live countdown to midnight of `birthday` in `timezone` (~4 updates/sec). */
export function useCountdown(birthday, timezone) {
  const [state, setState] = useState(() => getCountdown(birthday, timezone));

  useEffect(() => {
    setState(getCountdown(birthday, timezone));
    const id = setInterval(() => setState(getCountdown(birthday, timezone)), 250);
    return () => clearInterval(id);
  }, [birthday, timezone]);

  return state; // { days, hours, minutes, seconds, total, isLive }
}
