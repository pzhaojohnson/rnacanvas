import type { QuadraticBezierBond } from './QuadraticBezierBond';
import { midpoint } from '@rnacanvas/points';
import { distance2D as distance } from 'Math/distance';
import { normalizeAngle } from 'Math/angles/normalizeAngle';
import { ControlPointDisplacement } from './positioning';

function isControlPointDisplacement(v: any): v is ControlPointDisplacement {
  return (
    v instanceof Object
    && typeof v.magnitude == 'number'
    && typeof v.angle == 'number'
  );
}

function controlPointDisplacementIsFinite(cpd: ControlPointDisplacement): boolean {
  return Number.isFinite(cpd.magnitude) && Number.isFinite(cpd.angle);
}

export type Vector = {
  x: number;
  y: number;
}

export function shiftControlPoint(bond: QuadraticBezierBond, v: Vector) {
  try {
    // forgo type checking until end of try block
    let pa: any = bond.path.array();
    let q = pa[1];
    let controlPoint = { x: q[1], y: q[2] };

    let baseCenter1 = { x: bond.base1.xCenter, y: bond.base1.yCenter };
    let baseCenter2 = { x: bond.base2.xCenter, y: bond.base2.yCenter };
    let mp = midpoint(baseCenter1, baseCenter2);
    let a12 = Math.atan2(baseCenter2.y - baseCenter1.y, baseCenter2.x - baseCenter1.x);

    controlPoint.x += v.x;
    controlPoint.y += v.y;
    let amc = Math.atan2(controlPoint.y - mp.y, controlPoint.x - mp.x);

    let cpd = {
      magnitude: distance(mp.x, mp.y, controlPoint.x, controlPoint.y),
      angle: normalizeAngle(amc, a12) - a12,
    };

    // type check (and check for finiteness) before setting
    if (isControlPointDisplacement(cpd) && controlPointDisplacementIsFinite(cpd)) {
      bond.setControlPointDisplacement(cpd);
    } else {
      console.error('Unable to shift control point of quadratic bezier bond.');
    }

  } catch (error) {
    console.error(error);
    console.error('Unable to shift control point of quadratic bezier bond.');
  }
}
