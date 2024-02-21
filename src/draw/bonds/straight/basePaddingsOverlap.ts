import type { StraightBond } from 'Draw/bonds/straight/StraightBond';

import { distance } from '@rnacanvas/points';

/**
 * Returns true if the two base paddings of the straight bond overlap.
 */
export function basePaddingsOverlap(straightBond: StraightBond): boolean {
  // the distance between the two base centers
  let d = distance(
    straightBond.base1.center(),
    straightBond.base2.center(),
  );

  return d <= straightBond.basePadding1 + straightBond.basePadding2;
}
