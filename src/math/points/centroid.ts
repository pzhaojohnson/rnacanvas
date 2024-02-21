import { mean } from '@rnacanvas/math';
import { Point2D } from 'Math/points/Point';

/**
 * It is not firmly defined what is returned for an
 * empty array of points.
 */
export function centroid2D(points: Point2D[]): Point2D {
  if (points.length == 0) {
    return { x: NaN, y: NaN };
  } else {
    return {
      x: mean(points.map(point => point.x)),
      y: mean(points.map(point => point.y)),
    };
  }
}
