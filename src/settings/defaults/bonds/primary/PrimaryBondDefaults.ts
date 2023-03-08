import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

const lineAttributeNames = [
  'stroke',
  'stroke-width',
  'stroke-opacity',
] as const;

const propertyNames = [
  'basePadding1',
  'basePadding2',
] as const;

export type SavedPrimaryBondDefaults = (
  ReturnType<
    InstanceType<typeof PrimaryBondDefaults>['toSaved']
  >
);

type SavedLineAttributes = SavedPrimaryBondDefaults['line'];

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

  /**
   * Sets the values of the primary bond to these default values.
   */
  applyTo(pb: PrimaryBond) {
    lineAttributeNames.forEach(name => {
      pb.line.attr(name, this.line[name].getValue());
    });

    propertyNames.forEach(name => {
      pb[name] = this[name].getValue();
    });
  }

  /**
   * Returns the saved form of these primary bond defaults.
   *
   * The saved form of these primary bond defaults can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return {
      line: {
        'stroke': this.line['stroke'].getValue(),
        'stroke-width': this.line['stroke-width'].getValue(),
        'stroke-opacity': this.line['stroke-opacity'].getValue(),
      },
      basePadding1: this.basePadding1.getValue(),
      basePadding2: this.basePadding2.getValue(),
    };
  }

  /**
   * Sets the values of these primary bond defaults to the saved
   * values.
   */
  applySaved(saved: SavedPrimaryBondDefaults): void;

  /**
   * Since the saved values could have been read from a file, this
   * method is designed to be able to handle any unknown saved
   * value(s).
   *
   * Invalid and undefined values are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    try {
      this._applySavedLineAttributes((saved as any).line);
    } catch {}

    try {
      this._applySavedProperties(saved);
    } catch {}
  }

  _applySavedLineAttributes(saved: SavedLineAttributes | unknown) {
    lineAttributeNames.forEach(name => {
      try {
        let value: unknown = (saved as any)[name];

        if (value !== undefined) {
          this.line[name].setValue(value);
        }
      } catch {}
    });
  }

  _applySavedProperties(saved: SavedPrimaryBondDefaults | unknown) {
    propertyNames.forEach(name => {
      try {
        let value: unknown = (saved as any)[name];

        if (value !== undefined) {
          this[name].setValue(value);
        }
      } catch {}
    });
  }
}
