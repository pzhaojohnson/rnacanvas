import { StraightBondDefaults } from 'Settings/defaults/bonds/StraightBondDefaults';

/**
 * Default values that can be used for primary bonds in the drawing of
 * the app.
 */
export class PrimaryBondDefaults extends StraightBondDefaults {
  constructor() {
    super();

    this.line['stroke'].setValue('#808080');
    this.line['stroke-width'].setValue(1);
    this.line['stroke-opacity'].setValue(1);

    this.basePadding1.setValue(8);
    this.basePadding2.setValue(8);
  }
}
