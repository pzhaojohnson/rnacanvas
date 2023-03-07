import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import { NonNegativeFiniteNumber } from 'Values/NonNegativeFiniteNumber';

import { SVGColor } from 'Values/svg/SVGColor';
import { SVGOpacity } from 'Values/svg/SVGOpacity';

import { SVGFontFamily } from 'Values/svg/SVGFontFamily';
import { SVGFontSize } from 'Values/svg/SVGFontSize';
import { SVGFontWeight } from 'Values/svg/SVGFontWeight';

const textAttributeNames = [
  'font-family',
  'font-size',
  'font-weight',
  'fill',
  'fill-opacity',
] as const;

const lineAttributeNames = [
  'stroke',
  'stroke-width',
  'stroke-opacity',
] as const;

const propertyNames = [
  'basePadding',
  'lineLength',
] as const;

export type SavedBaseNumberingDefaults = (
  ReturnType<
    InstanceType<typeof BaseNumberingDefaults>['toSaved']
  >
);

type SavedTextAttributes = SavedBaseNumberingDefaults['text'];

type SavedLineAttributes = SavedBaseNumberingDefaults['line'];

/**
 * Default values for base numberings in the drawing of the app.
 */
export class BaseNumberingDefaults {
  text: {
    'font-family': SVGFontFamily,
    'font-size': SVGFontSize,
    'font-weight': SVGFontWeight,
    'fill': SVGColor,
    'fill-opacity': SVGOpacity,
  };

  line: {
    'stroke': SVGColor,
    'stroke-width': NonNegativeFiniteNumber,
    'stroke-opacity': SVGOpacity,
  };

  basePadding: NonNegativeFiniteNumber;
  lineLength: NonNegativeFiniteNumber;

  constructor() {
    this.text = {
      'font-family': new SVGFontFamily('Arial'),
      'font-size': new SVGFontSize(8),
      'font-weight': new SVGFontWeight(400),
      'fill': new SVGColor('#808080'),
      'fill-opacity': new SVGOpacity(1),
    };

    this.line = {
      'stroke': new SVGColor('#808080'),
      'stroke-width': new NonNegativeFiniteNumber(1),
      'stroke-opacity': new SVGOpacity(1),
    };

    this.basePadding = new NonNegativeFiniteNumber(8);
    this.lineLength = new NonNegativeFiniteNumber(8);
  }

  /**
   * Sets the values of the base numbering to these default values.
   */
  applyTo(bn: BaseNumbering) {
    textAttributeNames.forEach(name => {
      bn.text.attr(name, this.text[name].getValue());
    });

    lineAttributeNames.forEach(name => {
      bn.line.attr(name, this.line[name].getValue());
    });

    propertyNames.forEach(name => {
      bn[name] = this[name].getValue();
    });
  }

  /**
   * Returns the saved form of these base numbering defaults.
   *
   * The saved form of these base numbering defaults can be directly
   * converted to and from JSON.
   */
  toSaved() {
    return {
      text: {
        'font-family': this.text['font-family'].getValue(),
        'font-size': this.text['font-size'].getValue(),
        'font-weight': this.text['font-weight'].getValue(),
        'fill': this.text['fill'].getValue(),
        'fill-opacity': this.text['fill-opacity'].getValue(),
      },
      line: {
        'stroke': this.line['stroke'].getValue(),
        'stroke-width': this.line['stroke-width'].getValue(),
        'stroke-opacity': this.line['stroke-opacity'].getValue(),
      },
      basePadding: this.basePadding.getValue(),
      lineLength: this.lineLength.getValue(),
    };
  }

  /**
   * Sets the values of these base numbering defaults to the saved
   * default values.
   */
  applySaved(saved: SavedBaseNumberingDefaults): void;

  /**
   * Since the saved default values might have been read from a file,
   * this method is designed to handle any unknown saved value(s).
   *
   * Invalid and undefined saved values are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    try {
      this._applySavedTextAttributes((saved as any).text);
    } catch {}

    try {
      this._applySavedLineAttributes((saved as any).line);
    } catch {}

    try {
      this._applySavedProperties(saved);
    } catch {}
  }

  _applySavedTextAttributes(saved: SavedTextAttributes | unknown) {
    textAttributeNames.forEach(name => {
      try {
        let value: unknown = (saved as any)[name];

        if (value !== undefined) {
          this.text[name].setValue(value);
        }
      } catch {}
    });
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

  _applySavedProperties(saved: SavedBaseNumberingDefaults | unknown) {
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
