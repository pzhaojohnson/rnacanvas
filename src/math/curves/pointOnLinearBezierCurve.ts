import type { LinearBezierCurve } from 'Math/curves/LinearBezierCurve';
import type { Point2D as Point } from 'Math/points/Point';
import { displacement } from '@rnacanvas/points';

/**
 * Returns the point on the linear bezier curve for a given value of t
 * where t of 0 corresponds to the start point and t of 1 corresponds
 * to the end point of the linear bezier curve.
 */
export function pointOnLinearBezierCurve(curve: LinearBezierCurve, t: number): Point {
  let d = displacement(curve.startPoint, curve.endPoint);

  return {
    x: curve.startPoint.x + (t * d.x),
    y: curve.startPoint.y + (t * d.y),
  };
}
