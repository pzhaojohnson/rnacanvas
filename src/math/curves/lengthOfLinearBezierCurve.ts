import type { LinearBezierCurve } from 'Math/curves/LinearBezierCurve';
import { distance } from '@rnacanvas/points';

export function lengthOfLinearBezierCurve(curve: LinearBezierCurve): number {
  return distance(curve.startPoint, curve.endPoint);
}
