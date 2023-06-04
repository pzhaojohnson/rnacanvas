import { StraightBond } from './StraightBond';

import type { Base } from 'Draw/bases/Base';

import * as SVG from '@svgdotjs/svg.js';

export type Args = {
  base1: Base;
  base2: Base;
};

/**
 * Creates a straight bond between the two bases.
 */
export function createStraightBond(args: Args): StraightBond {
  let { base1, base2 } = args;

  let line = new SVG.Line();

  let baseCenter1 = base1.getCenter();
  let baseCenter2 = base2.getCenter();

  line.attr({
    'x1': baseCenter1.x,
    'y1': baseCenter1.y,
    'x2': baseCenter2.x,
    'y2': baseCenter2.y,
  });

  return new StraightBond({ base1, base2, line });
}
