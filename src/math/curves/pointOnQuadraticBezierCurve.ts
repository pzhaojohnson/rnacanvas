import type { QuadraticBezierCurve } from 'Math/curves/QuadraticBezierCurve';
import type { Point2D as Point } from 'Math/points/Point';
import { displacement } from '@rnacanvas/points';

/**
 * Calculates a point on the quadratic bezier curve for a given value of t
 * where t of 0 corresponds to the start point and t of 1 corresponds to
 * the end point of the quadratic bezier curve.
 */
export function pointOnQuadraticBezierCurve(curve: QuadraticBezierCurve, t: number): Point {
  let d1 = displacement(curve.controlPoint, curve.startPoint);
  let d2 = displacement(curve.controlPoint, curve.endPoint);

  return {
    x: curve.controlPoint.x + d1.x * (1 - t)**2 + d2.x * t**2,
    y: curve.controlPoint.y + d1.y * (1 - t)**2 + d2.y * t**2,
  };
}
