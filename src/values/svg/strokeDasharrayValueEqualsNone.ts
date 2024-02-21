import { isNullish } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';
import { isBlank } from 'Parse/isBlank';

/**
 * Returns whether the given value is equal to the string "none" when
 * assigned to the stroke-dasharray attribute of an SVG element.
 *
 * Returns true for null and undefined.
 *
 * Returns true for empty and blank strings.
 *
 * Returns true for the string "none" regardless of upper or lower case
 * and leading and trailing whitespace.
 *
 * Returns true for an empty array.
 *
 * Returns false otherwise.
 */
export function strokeDasharrayValueEqualsNone(value: unknown): boolean {
  if (isNullish(value)) {
    return true;
  }

  if (isString(value) && isBlank(value)) {
    return true;
  }

  if (isString(value) && value.toLowerCase().trim() == 'none') {
    return true;
  }

  if (Array.isArray(value) && value.length == 0) {
    return true;
  }

  return false;
}
