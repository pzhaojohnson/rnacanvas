// the underlying displacement2D function
import { displacement as _displacement2D } from '@rnacanvas/points';

import type { Point2D as _Point2D } from 'Math/points/Point';
import { isPoint2D as _isPoint2D } from 'Math/points/Point';

import type { Point2D } from 'Draw/svg/math/points/Point';
import { interpretNumericValue } from 'Draw/svg/interpretNumericValue';

export type Vector2D = _Point2D;

/**
 * Calculates the displacement from point 1 to point 2 whose coordinates
 * are SVG numeric values.
 *
 * Returns undefined if any of the points coordinates cannot be interpreted.
 */
export function displacement2D(p1: Point2D, p2: Point2D): Vector2D | undefined {
  let _p1 = {
    x: interpretNumericValue(p1.x)?.valueOf(),
    y: interpretNumericValue(p1.y)?.valueOf(),
  };
  let _p2 = {
    x: interpretNumericValue(p2.x)?.valueOf(),
    y: interpretNumericValue(p2.y)?.valueOf(),
  };

  if (!_isPoint2D(_p1) || !_isPoint2D(_p2)) {
    return undefined;
  } else {
    return _displacement2D(_p1, _p2);
  }
}
