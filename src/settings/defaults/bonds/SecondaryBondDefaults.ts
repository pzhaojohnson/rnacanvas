import { StraightBondDefaults } from 'Settings/defaults/bonds/StraightBondDefaults';

/**
 * Default values for secondary bonds in the drawing of the app
 * organized by secondary bond type (e.g., AUT, GC, GUT, other).
 */
export class SecondaryBondDefaults {
  AUT = new StraightBondDefaults();
  GC = new StraightBondDefaults();
  GUT = new StraightBondDefaults();
  other = new StraightBondDefaults();

  constructor() {
    this.AUT.line['stroke'].setValue('#000000');
    this.AUT.line['stroke-width'].setValue(2);
    this.AUT.line['stroke-opacity'].setValue(1);
    this.AUT.basePadding1.setValue(6);
    this.AUT.basePadding2.setValue(6);

    this.GC.line['stroke'].setValue('#000000');
    this.GC.line['stroke-width'].setValue(2);
    this.GC.line['stroke-opacity'].setValue(1);
    this.GC.basePadding1.setValue(6);
    this.GC.basePadding2.setValue(6);

    this.GUT.line['stroke'].setValue('#000000');
    this.GUT.line['stroke-width'].setValue(2);
    this.GUT.line['stroke-opacity'].setValue(1);
    this.GUT.basePadding1.setValue(6);
    this.GUT.basePadding2.setValue(6);

    this.other.line['stroke'].setValue('#000000');
    this.other.line['stroke-width'].setValue(2);
    this.other.line['stroke-opacity'].setValue(1);
    this.other.basePadding1.setValue(6);
    this.other.basePadding2.setValue(6);
  }
}
