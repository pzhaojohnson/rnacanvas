import type { Base } from 'Draw/bases/Base';

import { PrimaryBond } from './PrimaryBond';

import { createStraightBond } from './private/createStraightBond';

import { LineThicknessOptimizerBuilder } from 'Draw/bonds/line-thickness/LineThicknessOptimizerBuilder';

import { BasePaddingsOptimizerBuilder } from 'Draw/bonds/base-paddings/BasePaddingsOptimizerBuilder';

let lineThicknessOptimizerBuilder = new LineThicknessOptimizerBuilder();

let lineThicknessOptimizer = (
  lineThicknessOptimizerBuilder.buildForPrimaryBonds()
);

let basePaddingsOptimizerBuilder = new BasePaddingsOptimizerBuilder();

let basePaddingsOptimizer = (
  basePaddingsOptimizerBuilder.buildForPrimaryBonds()
);

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

  lineThicknessOptimizer.applyTo(pb);

  basePaddingsOptimizer.applyTo(pb);

  return pb;
}
