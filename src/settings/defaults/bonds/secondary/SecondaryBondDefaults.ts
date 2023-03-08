import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

/**
 * Default values for secondary bonds in the drawing of the app
 * organized by secondary bond type (e.g., AUT, GC, GUT, other).
 */
export class SecondaryBondDefaults {
  AUT = {
    line: {
      'stroke': new SVGColor('#000000'),
      'stroke-width': new NonNegativeFiniteNumber(2),
      'stroke-opacity': new SVGOpacity(1),
    },
    basePadding1: new NonNegativeFiniteNumber(6),
    basePadding2: new NonNegativeFiniteNumber(6),
  };

  GC = {
    line: {
      'stroke': new SVGColor('#000000'),
      'stroke-width': new NonNegativeFiniteNumber(2),
      'stroke-opacity': new SVGOpacity(1),
    },
    basePadding1: new NonNegativeFiniteNumber(6),
    basePadding2: new NonNegativeFiniteNumber(6),
  };

  GUT = {
    line: {
      'stroke': new SVGColor('#000000'),
      'stroke-width': new NonNegativeFiniteNumber(2),
      'stroke-opacity': new SVGOpacity(1),
    },
    basePadding1: new NonNegativeFiniteNumber(6),
    basePadding2: new NonNegativeFiniteNumber(6),
  };

  other = {
    line: {
      'stroke': new SVGColor('#000000'),
      'stroke-width': new NonNegativeFiniteNumber(2),
      'stroke-opacity': new SVGOpacity(1),
    },
    basePadding1: new NonNegativeFiniteNumber(6),
    basePadding2: new NonNegativeFiniteNumber(6),
  };
}
