import type { QuadraticBezierBond } from './QuadraticBezierBond';
import { midpoint } from '@rnacanvas/points';
import { distance2D as distance } from 'Math/distance';
import { normalizeAngle } from 'Math/angles/normalizeAngle';

// relative to the midpoint between the centers
// of bases 1 and 2 of a bond
export type ControlPointDisplacement = {
  magnitude: number;

  // relative to the angle from the center of base 1
  // to the center of base 2
  angle: number;
}

export type Positioning = {
  basePadding1: number;
  basePadding2: number;
  controlPointDisplacement: ControlPointDisplacement;
}

function isPositioning(p: any): p is Positioning {
  return (
    p instanceof Object
    && typeof p.basePadding1 == 'number'
    && typeof p.basePadding2 == 'number'
    && p.controlPointDisplacement instanceof Object
    && typeof p.controlPointDisplacement.magnitude == 'number'
    && typeof p.controlPointDisplacement.angle == 'number'
  );
}

function positioningIsFinite(p: Positioning): boolean {
  return (
    Number.isFinite(p.basePadding1)
    && Number.isFinite(p.basePadding2)
    && Number.isFinite(p.controlPointDisplacement.magnitude)
    && Number.isFinite(p.controlPointDisplacement.angle)
  );
}

// returns undefined if unable to retrieve positioning
export function positioning(bond: QuadraticBezierBond): Positioning | undefined {
  try {
    // forgo type checking until end of try block
    let pa: any = bond.path.array();
    let m = pa[0];
    let q = pa[1];
    let startingPoint = { x: m[1], y: m[2] };
    let controlPoint = { x: q[1], y: q[2] };
    let endPoint = { x: q[3], y: q[4] };

    let baseCenter1 = { x: bond.base1.xCenter, y: bond.base1.yCenter };
    let baseCenter2 = { x: bond.base2.xCenter, y: bond.base2.yCenter };

    let mp = midpoint(baseCenter1, baseCenter2);
    let a12 = Math.atan2(baseCenter2.y - baseCenter1.y, baseCenter2.x - baseCenter1.x);
    let amc = Math.atan2(controlPoint.y - mp.y, controlPoint.x - mp.x);

    let p = {
      basePadding1: distance(baseCenter1.x, baseCenter1.y, startingPoint.x, startingPoint.y),
      basePadding2: distance(baseCenter2.x, baseCenter2.y, endPoint.x, endPoint.y),
      controlPointDisplacement: {
        magnitude: distance(mp.x, mp.y, controlPoint.x, controlPoint.y),
        angle: normalizeAngle(amc, a12) - a12,
      },
    };

    // type check (and check for finiteness) before returning
    if (isPositioning(p) && positioningIsFinite(p)) {
      return p;
    } else {
      console.error('Unable to retrieve positioning of quadratic bezier bond.');
    }
  } catch (error) {
    console.error(error);
    console.error('Unable to retrieve positioning of quadratic bezier bond.');
  }
}
