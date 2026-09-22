/**
 * Timezone-accurate helpers.
 * The countdown must target 00:00 on the birthday *in the configured
 * IANA timezone*, regardless of the visitor's device timezone.
 */

/** Offset (ms) of `timeZone` relative to UTC at the given instant. */
export function getTimeZoneOffsetMs(timeZone, date) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(dtf.formatToParts(date).map((p) => [p.type, p.value]));
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) % 24,
    Number(parts.minute),
    Number(parts.second),
  );
  return asUTC - date.getTime();
}

/**
 * Epoch ms of 00:00:00 on `dateStr` (YYYY-MM-DD) in `timeZone`.
 * Refines the estimate a few times so DST edges resolve correctly.
 */
export function midnightInZoneMs(dateStr, timeZone) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const wallUtc = Date.UTC(y, m - 1, d, 0, 0, 0);
  let target = wallUtc;
  for (let i = 0; i < 3; i++) {
    target = wallUtc - getTimeZoneOffsetMs(timeZone, new Date(target));
  }
  return target;
}

/** Split a millisecond duration into days / hours / minutes / seconds. */
export function splitDuration(ms) {
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { days, hours, minutes, seconds, total };
}

export const pad2 = (n) => String(n).padStart(2, '0');
