import type { StraightBond } from 'Draw/bonds/straight/StraightBond';

import { SVGLineDefaults } from 'Settings/defaults/svg/SVGLineDefaults';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

const propertyNames = [
  'basePadding1',
  'basePadding2',
] as const;

export type SavedStraightBondDefaults = (
  ReturnType<
    InstanceType<typeof StraightBondDefaults>['toSaved']
  >
);

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

  /**
   * Sets the values of the straight bond to these default values.
   */
  applyTo(sb: StraightBond) {
    this.line.applyTo(sb.line);

    propertyNames.forEach(name => {
      sb[name] = this[name].getValue();
    });
  }

  /**
   * Returns the saved form of these straight bond defaults.
   *
   * The saved form of these straight bond defaults can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return {
      line: this.line.toSaved(),
      basePadding1: this.basePadding1.getValue(),
      basePadding2: this.basePadding2.getValue(),
    };
  }
}
