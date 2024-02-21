import type { LinearBezierCurve } from 'Math/curves/LinearBezierCurve';
import { displacement2D as displacement } from 'Math/points/displacement';
import { direction } from '@rnacanvas/vectors';

/**
 * Returns the angle (in radians) that is the direction of the vector
 * going from the start point to the end point of the linear bezier curve.
 */
export function directionOfLinearBezierCurve(curve: LinearBezierCurve): number {
  return direction(displacement(curve.startPoint, curve.endPoint));
}
