import type { StraightBond } from 'Draw/bonds/straight/StraightBond';

import { SVGLineDefaults } from 'Settings/defaults/svg/SVGLineDefaults';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

const propertyNames = [
  'basePadding1',
  'basePadding2',
] as const;

type PropertyName = typeof propertyNames[number];

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

  /**
   * Sets the values of these straight bond defaults to the saved
   * values.
   */
  applySaved(saved: SavedStraightBondDefaults): void;

  /**
   * Since the saved values could have been read from a file, this
   * method is designed to be able to handle any unknown saved
   * value(s).
   *
   * Invalid and undefined saved values are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    this._applySavedLineDefaults(saved);
    this._applySavedProperties(saved);
  }

  _applySavedLineDefaults(saved: SavedStraightBondDefaults | unknown) {
    let savedLineDefaults: unknown = undefined;

    // enclose any type cast in try block
    try {
      savedLineDefaults = (saved as any).line;
    } catch {}

    if (savedLineDefaults !== undefined) {
      this.line.applySaved(savedLineDefaults);
    }
  }

  _applySavedProperties(saved: SavedStraightBondDefaults | unknown) {
    type SavedProperty = { name: PropertyName, value: unknown };
    let savedProperties: SavedProperty[] = [];

    // enclose any type cast in try block
    propertyNames.forEach(name => {
      try {
        let value: unknown = (saved as any)[name];
        savedProperties.push({ name, value });
      } catch {}
    });

    savedProperties = savedProperties.filter(sp => sp.value !== undefined);

    // setValue methods might throw for invalid values
    savedProperties.forEach(sp => {
      try {
        this[sp.name].setValue(sp.value);
      } catch {}
    });
  }
}
