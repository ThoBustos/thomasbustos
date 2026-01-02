/**
 * Formats a duration in minutes to a human-readable string.
 * - Under 60 min: "22 min"
 * - Exactly 1 hour: "1 hr"
 * - Multiple hours even: "3 hrs"
 * - Hours with minutes: "3h 52m"
 *
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return '?';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  if (remainingMins === 0) {
    return hours === 1 ? '1 hr' : `${hours} hrs`;
  }
  return `${hours}h ${remainingMins}m`;
}
