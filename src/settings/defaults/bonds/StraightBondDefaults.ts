import { SVGLineDefaults } from 'Settings/defaults/svg/SVGLineDefaults';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

/**
 * Default values that can be used for straight bonds (e.g., primary
 * and secondary bonds) in the drawing of the app.
 */
export class StraightBondDefaults {
  line = new SVGLineDefaults();

  basePadding1 = new NonNegativeFiniteNumber(6);
  basePadding2 = new NonNegativeFiniteNumber(6);

  constructor() {
    this.line['stroke'].setValue('#000000');
    this.line['stroke-width'].setValue(1);
    this.line['stroke-opacity'].setValue(1);
  }
}
