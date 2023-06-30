import { SecondaryBond } from './SecondaryBond';

import type { Base } from 'Draw/bases/Base';

import { createStraightBond } from './private/createStraightBond';

import { BasePaddingsOptimizerBuilder } from 'Draw/bonds/base-paddings/BasePaddingsOptimizerBuilder';

let basePaddingsOptimizerBuilder = new BasePaddingsOptimizerBuilder();

let basePaddingsOptimizer = (
  basePaddingsOptimizerBuilder.buildForSecondaryBonds()
);

export type Args = {
  base1: Base;
  base2: Base;
};

/**
 * Creates a secondary bond between the two bases.
 */
export function createSecondaryBond(args: Args): SecondaryBond {
  let { base1, base2 } = args;

  let straightBond = createStraightBond({ base1, base2 });

  // use line element of newly created straight bond
  let line = straightBond.line;

  let secondaryBond = new SecondaryBond(line, base1, base2);

  // apply default values
  let defaults = SecondaryBond.recommendedDefaults[secondaryBond.type];
  secondaryBond.line.attr(defaults.line);

  basePaddingsOptimizer.applyTo(secondaryBond);

  return secondaryBond;
}
