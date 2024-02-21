import type { QuadraticBezierCurve } from 'Math/curves/QuadraticBezierCurve';
import { displacement } from '@rnacanvas/points';
import { direction } from '@rnacanvas/vectors';

/**
 * Calculates the angle (in radians) that is the direction of the quadratic
 * bezier curve for a given value of t where t of 0 corresponds to the start
 * point and t of 1 corresponds to the end point of the quadratic bezier curve.
 */
export function directionOfQuadraticBezierCurve(curve: QuadraticBezierCurve, t: number): number {
  let d1 = displacement(curve.startPoint, curve.controlPoint);
  let d2 = displacement(curve.controlPoint, curve.endPoint);

  let x = d1.x * 2 * (1 - t) + d2.x * 2 * t;
  let y = d1.y * 2 * (1 - t) + d2.y * 2 * t;

  return direction({ x, y });
}
