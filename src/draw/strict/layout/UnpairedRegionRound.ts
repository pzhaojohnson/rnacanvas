import NormalizedBaseCoordinates from './NormalizedBaseCoordinates';
import { normalizeAngle } from 'Math/angles/normalizeAngle';
import { circleCenter } from './circleCenter';
import { distance2D as distance } from 'Math/distance';
import { displacement2D as displacement } from 'Math/points/displacement';
import { direction } from '@rnacanvas/vectors';
import { RoundLoop } from './StemLayout';
import { UnpairedRegionInterface as UnpairedRegion } from './StemInterface';
import GeneralStrictLayoutProps from './GeneralStrictLayoutProps';

const _VERY_SMALL_THRESHOLD = 0.001;

interface Coordinates {
  x: number;
  y: number;
}

function _coordinatesBounding5(ur: UnpairedRegion, generalProps: GeneralStrictLayoutProps): Coordinates {
  if (ur.boundingStem5.isOutermostStem()) {
    let c = RoundLoop.center(ur.boundingStem5, generalProps);
    let r = RoundLoop.radius(ur.boundingStem5, generalProps);
    let angle = RoundLoop.terminusAngle5(ur.boundingStem5, generalProps);
    return {
      x: c.x + (r * Math.cos(angle)),
      y: c.y + (r * Math.sin(angle)),
    };
  } else {
    let bcb5 = ur.baseCoordinatesBounding5();
    return { x: bcb5.xCenter, y: bcb5.yCenter };
  }
}

function _coordinatesBounding3(ur: UnpairedRegion, generalProps: GeneralStrictLayoutProps): Coordinates {
  if (ur.boundingStem3.isOutermostStem()) {
    let c = RoundLoop.center(ur.boundingStem3, generalProps);
    let r = RoundLoop.radius(ur.boundingStem3, generalProps);
    let angle = RoundLoop.terminusAngle3(ur.boundingStem3, generalProps);
    return {
      x: c.x + (r * Math.cos(angle)),
      y: c.y + (r * Math.sin(angle)),
    };
  } else {
    let bcb3 = ur.baseCoordinatesBounding3();
    return { x: bcb3.xCenter, y: bcb3.yCenter };
  }
}

/**
 * The polar length to fit between the bounds.
 */
function _polarLengthToFit(ur: UnpairedRegion): number {
  if (ur.boundingStem5.isOutermostStem() && ur.boundingStem3.isOutermostStem()) {
    return ur.size;
  } else if (ur.boundingStem5.isOutermostStem() || ur.boundingStem3.isOutermostStem()) {
    return ur.size + 0.5;
  } else {
    return ur.size + 1;
  }
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _center(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): Coordinates {
  let bs5 = ur.boundingStem5;
  let bs3 = ur.boundingStem3;
  let verySmallTerminiGap = generalProps.terminiGap < _VERY_SMALL_THRESHOLD;
  if (bs5.isOutermostStem() && bs3.isOutermostStem() && verySmallTerminiGap) {
    let circumference = _polarLengthToFit(ur);
    let radius = circumference / (2 * Math.PI);
    let angle = RoundLoop.originAngle(bs5, generalProps) + Math.PI;
    return {
      x: cb5.x + (radius * Math.cos(angle)),
      y: cb5.y + (radius * Math.sin(angle)),
    };
  } else {
    let polarLengthToFit = _polarLengthToFit(ur);
    return circleCenter(cb5.x, cb5.y, cb3.x, cb3.y, polarLengthToFit);
  }
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _radius(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  let center = _center(ur, generalProps, cb5, cb3);
  return distance(center.x, center.y, cb5.x, cb5.y);
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _angleBounding5(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  let center = _center(ur, generalProps, cb5, cb3);
  return direction(displacement(center, cb5));
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _angleBounding3(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  let center = _center(ur, generalProps, cb5, cb3);
  return direction(displacement(center, cb3));
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _angleSpanBetweenBounds(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  let bs5 = ur.boundingStem5;
  let bs3 = ur.boundingStem3;
  let verySmallTerminiGap = generalProps.terminiGap < _VERY_SMALL_THRESHOLD;
  if (bs5.isOutermostStem() && bs3.isOutermostStem() && verySmallTerminiGap) {
    return 2 * Math.PI;
  } else {
    let angle5 = _angleBounding5(ur, generalProps, cb5, cb3);
    let angle3 = _angleBounding3(ur, generalProps, cb5, cb3);
    angle3 = normalizeAngle(angle3, angle5);
    return angle3 - angle5;
  }
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _polarLengthBetweenBounds(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  let angleSpan = _angleSpanBetweenBounds(ur, generalProps, cb5, cb3);
  let radius = _radius(ur, generalProps, cb5, cb3);
  return angleSpan * radius;
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _startingAngle(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  if (ur.size === 0) {
    return 0;
  } else if (ur.boundingStem5.isOutermostStem()) {
    let angle5 = _angleBounding5(ur, generalProps, cb5, cb3);
    let angleSpan = _angleSpanBetweenBounds(ur, generalProps, cb5, cb3);
    let polarLengthBetweenBounds = _polarLengthBetweenBounds(ur, generalProps, cb5, cb3);
    return angle5 + (angleSpan * (0.5 / polarLengthBetweenBounds));
  } else {
    let angle5 = _angleBounding5(ur, generalProps, cb5, cb3);
    let angleSpan = _angleSpanBetweenBounds(ur, generalProps, cb5, cb3);
    if (ur.boundingStem3.isOutermostStem()) {
      let polarLengthBetweenBounds = _polarLengthBetweenBounds(ur, generalProps, cb5, cb3);
      angleSpan += angleSpan * (0.5 / polarLengthBetweenBounds);
    }
    return angle5 + (angleSpan / (ur.size + 1));
  }
}

/**
 * cb5 are the 5' bounding coordinates.
 * cb3 are the 3' bounding coordinates.
 */
function _angleIncrement(
  ur: UnpairedRegion,
  generalProps: GeneralStrictLayoutProps,
  cb5: Coordinates,
  cb3: Coordinates,
): number {
  if (ur.size === 0) {
    return 0;
  } else {
    let startingAngle = _startingAngle(ur, generalProps, cb5, cb3);
    let angle3 = _angleBounding3(ur, generalProps, cb5, cb3);
    angle3 = normalizeAngle(angle3, startingAngle);
    if (ur.boundingStem3.isOutermostStem()) {
      let angleSpan = _angleSpanBetweenBounds(ur, generalProps, cb5, cb3);
      let polarLengthBetweenBounds = _polarLengthBetweenBounds(ur, generalProps, cb5, cb3);
      angle3 += angleSpan * (0.5 / polarLengthBetweenBounds);
    }
    return (angle3 - startingAngle) / ur.size;
  }
}

function baseCoordinatesRound(ur: UnpairedRegion, generalProps: GeneralStrictLayoutProps): NormalizedBaseCoordinates[] {
  if (ur.size === 0) {
    return [];
  } else {
    let coordinates = [];
    let cb5 = _coordinatesBounding5(ur, generalProps);
    let cb3 = _coordinatesBounding3(ur, generalProps);
    let center = _center(ur, generalProps, cb5, cb3);
    let radius = _radius(ur, generalProps, cb5, cb3);
    let angle = _startingAngle(ur, generalProps, cb5, cb3);
    let angleIncrement = _angleIncrement(ur, generalProps, cb5, cb3);
    for (let p = ur.boundingPosition5 + 1; p < ur.boundingPosition3; p++) {
      let xCenter = center.x + (radius * Math.cos(angle));
      let yCenter = center.y + (radius * Math.sin(angle));
      coordinates.push(new NormalizedBaseCoordinates(xCenter - 0.5, yCenter - 0.5));
      angle += angleIncrement;
    }
    return coordinates;
  }
}

export {
  baseCoordinatesRound,

  // these are only exported to aid testing
  _coordinatesBounding5,
  _coordinatesBounding3,
  _polarLengthToFit,
  _center,
  _radius,
  _angleBounding5,
  _angleBounding3,
  _angleSpanBetweenBounds,
  _polarLengthBetweenBounds,
  _startingAngle,
  _angleIncrement,
};
