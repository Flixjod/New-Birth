import { useEffect, useRef, useState } from 'react';
import { midnightInZoneMs, splitDuration } from '../utils/time';

/**
 * Ticks toward 00:00 on the birthday in the configured timezone.
 * Returns { days, hours, minutes, seconds, total, done }.
 */
export function useCountdown(birthday, timezone) {
  const targetRef = useRef(0);
  if (!targetRef.current) {
    targetRef.current = midnightInZoneMs(birthday, timezone);
  }
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    // Faster ticks in the final stretch so the last seconds feel alive.
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, []);

  const remaining = targetRef.current - now;
  const parts = splitDuration(remaining);
  return { ...parts, done: remaining <= 0 };
}
