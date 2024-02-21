// the underlying distance2D function
import { distance2D as _distance2D } from 'Math/distance';

import { interpretNumericValue } from 'Draw/svg/interpretNumericValue';
import { isNullish } from '@rnacanvas/value-check';

/**
 * Calculates the distance between the two points whose coordinates
 * are SVG numeric values.
 *
 * Returns undefined if any of the points coordinates cannot be interpreted.
 */
export function distance2D(x1: unknown, y1: unknown, x2: unknown, y2: unknown): number | undefined {
  let nx1 = interpretNumericValue(x1)?.valueOf();
  let ny1 = interpretNumericValue(y1)?.valueOf();
  let nx2 = interpretNumericValue(x2)?.valueOf();
  let ny2 = interpretNumericValue(y2)?.valueOf();

  if (isNullish(nx1) || isNullish(ny1) || isNullish(nx2) || isNullish(ny2)) {
    return undefined;
  } else {
    return _distance2D(nx1, ny1, nx2, ny2);
  }
}
