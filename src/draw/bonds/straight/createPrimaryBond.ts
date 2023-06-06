import type { Base } from 'Draw/bases/Base';

import { PrimaryBond } from './PrimaryBond';

import { createStraightBond } from './private/createStraightBond';

export type Args = {
  base1: Base;
  base2: Base;
};

/**
 * Creates a primary bond between the two bases.
 */
export function createPrimaryBond(args: Args): PrimaryBond {
  let { base1, base2 } = args;

  let sb = createStraightBond({ base1, base2 });

  // use the line element of the created straight bond
  let line = sb.line;

  let pb = new PrimaryBond(line, base1, base2);

  // apply default line attributes
  pb.line.attr(PrimaryBond.recommendedDefaults.line);

  // default to base paddings of 7
  pb.basePadding1 = PrimaryBond.recommendedDefaults.basePadding1 ?? 7;
  pb.basePadding2 = PrimaryBond.recommendedDefaults.basePadding2 ?? 7;

  return pb;
}
