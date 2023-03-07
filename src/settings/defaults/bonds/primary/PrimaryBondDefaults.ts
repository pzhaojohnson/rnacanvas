import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

/**
 * Default values for primary bonds in the drawing of the app.
 */
export class PrimaryBondDefaults {
  line: {
    'stroke': SVGColor,
    'stroke-width': NonNegativeFiniteNumber,
    'stroke-opacity': SVGOpacity,
  };

  basePadding1: NonNegativeFiniteNumber;
  basePadding2: NonNegativeFiniteNumber;

  constructor() {
    this.line = {
      'stroke': new SVGColor('#808080'),
      'stroke-width': new NonNegativeFiniteNumber(1),
      'stroke-opacity': new SVGOpacity(1),
    };

    this.basePadding1 = new NonNegativeFiniteNumber(8);
    this.basePadding2 = new NonNegativeFiniteNumber(8);
  }
}
