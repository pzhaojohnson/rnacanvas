/**
 * Returns true if the value is a number and finite (as determined by
 * the Number.isFinite method).
 *
 * Returns false otherwise.
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value == 'number' && Number.isFinite(value);
}
