import { midnightInZoneMs, splitDuration } from './timezone';

/**
 * Pure countdown snapshot: time remaining until midnight of `birthday`
 * in `timezone`. `isLive` is true once midnight has passed.
 */
export function getCountdown(birthday, timezone) {
  const target = midnightInZoneMs(birthday, timezone);
  const total = target - Date.now();
  return { ...splitDuration(total), total, isLive: total <= 0 };
}
