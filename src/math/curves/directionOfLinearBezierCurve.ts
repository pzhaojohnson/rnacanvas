import type { LinearBezierCurve } from 'Math/curves/LinearBezierCurve';
import { displacement } from '@rnacanvas/points';
import { direction } from '@rnacanvas/vectors';

/**
 * Returns the angle (in radians) that is the direction of the vector
 * going from the start point to the end point of the linear bezier curve.
 */
export function directionOfLinearBezierCurve(curve: LinearBezierCurve): number {
  return direction(displacement(curve.startPoint, curve.endPoint));
}
