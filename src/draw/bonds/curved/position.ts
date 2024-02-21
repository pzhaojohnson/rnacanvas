import type { QuadraticBezierBond } from './QuadraticBezierBond';
import { Positioning } from './positioning';
import { midpoint } from '@rnacanvas/points';
import { repositionStrungElementsOfBond } from 'Draw/bonds/strung/repositionStrungElementsOfBond';

export function position(bond: QuadraticBezierBond, p: Positioning) {
  try {
    let baseCenter1 = { x: bond.base1.xCenter, y: bond.base1.yCenter };
    let baseCenter2 = { x: bond.base2.xCenter, y: bond.base2.yCenter };

    let mp = midpoint(baseCenter1, baseCenter2);
    let a12 = Math.atan2(baseCenter2.y - baseCenter1.y, baseCenter2.x - baseCenter1.x);
    let amc = a12 + p.controlPointDisplacement.angle;
    let controlPoint = {
      x: mp.x + (p.controlPointDisplacement.magnitude * Math.cos(amc)),
      y: mp.y + (p.controlPointDisplacement.magnitude * Math.sin(amc)),
    };

    let a1c = Math.atan2(controlPoint.y - baseCenter1.y, controlPoint.x - baseCenter1.x);
    let startingPoint = {
      x: baseCenter1.x + (p.basePadding1 * Math.cos(a1c)),
      y: baseCenter1.y + (p.basePadding1 * Math.sin(a1c)),
    };

    let a2c = Math.atan2(controlPoint.y - baseCenter2.y, controlPoint.x - baseCenter2.x);
    let endPoint = {
      x: baseCenter2.x + (p.basePadding2 * Math.cos(a2c)),
      y: baseCenter2.y + (p.basePadding2 * Math.sin(a2c)),
    };

    let d = [
      'M', startingPoint.x, startingPoint.y,
      'Q', controlPoint.x, controlPoint.y, endPoint.x, endPoint.y,
    ].join(' ');
    bond.path.plot(d);

    repositionStrungElementsOfBond(bond);

  } catch (error) {
    console.error(error);
    console.error('Unable to position quadratic bezier bond.');
  }
}
