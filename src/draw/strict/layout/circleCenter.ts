import { distance2D as distance } from 'Math/distance';
import { displacement2D as displacement } from 'Math/points/displacement';
import { direction } from '@rnacanvas/vectors';

/**
 * Calculates the angle between the straight line connecting the
 * two points on the periphery of the circle and the tangent to
 * the circle at either point.
 */
function _straightTangentAngle(clockwisePolarDistance: number, straightDistance: number): number {
  let p = clockwisePolarDistance / 2;
  let s = straightDistance / 2;

  // 20 iterations seems to work well
  let iters = 20;

  function moreThanSemicircle(): number {

    // Math.PI seems to work well as an initial guess
    let b = Math.PI;

    // Newton's method of approximation
    for (let i = 0; i < iters; i++) {
      let y = ((p / s) * Math.sin(Math.PI - b)) - b;
      let yPrime = -((p / s) * Math.cos(Math.PI - b)) - 1;
      b -= y / yPrime;
    }

    return Math.PI - b;
  }

  function lessThanSemicircle(): number {

    // Math.PI / 2 seems to work well as an initial guess.
    let a = Math.PI / 2;

    // Newton's method of approximation
    for (let i = 0; i < iters; i++) {
      let y = ((p / s) * Math.sin(a)) - a;
      let yPrime = ((p / s) * Math.cos(a)) - 1;
      a -= y / yPrime;
    }

    return a;
  }

  if (clockwisePolarDistance > Math.PI * (straightDistance / 2)) {
    return moreThanSemicircle();
  } else {
    return lessThanSemicircle();
  }
}

export interface CircleCenter {
  x: number;
  y: number;
}

/**
 * Calculates the center point of a circle given two points on the periphery
 * of the circle and the polar distance between the two points going clockwise
 * from point 1 to point 2.
 *
 * To prevent number overflow, if the given two points and clockwise polar distance
 * specify a circle large enough to cause number overflow, then the center point
 * for a smaller but still large circle will be returned that, practically speaking,
 * would appear very similar to the true circle in a drawing of an RNA structure.
 *
 * If the given clockwise polar distance is less than the straight distance between
 * the two points on the periphery of the circle, then this function will calculate
 * the center point of the circle using a clockwise polar distance "slightly" larger
 * than the straight distance.
 */
function circleCenter(x1: number, y1: number, x2: number, y2: number, clockwisePolarDistance: number): CircleCenter {
  let straightDistance = Math.max(
    distance(x1, y1, x2, y2),
    0.001,
  );
  clockwisePolarDistance = Math.max(
    clockwisePolarDistance,
    straightDistance + 0.0001,
  );

  let angleToCenter = direction(
    displacement({ x: x1, y: y1 }, { x: x2, y: y2 }),
  );

  let sta = _straightTangentAngle(clockwisePolarDistance, straightDistance);
  if (clockwisePolarDistance > Math.PI * (straightDistance / 2)) {
    angleToCenter -= (Math.PI / 2) - sta;
  } else {
    angleToCenter += (Math.PI / 2) - sta;
  }

  let radius = (straightDistance / 2) / Math.sin(sta);
  return {
    x: x1 + (radius * Math.cos(angleToCenter)),
    y: y1 + (radius * Math.sin(angleToCenter)),
  };
}

export {
  circleCenter,
};
