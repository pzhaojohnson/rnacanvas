import * as SVG from '@svgdotjs/svg.js';

import { isBlank } from 'Parse/isBlank';

export type SavedSVGColor = (
  ReturnType<
    InstanceType<typeof SVGColor>['toSaved']
  >
);

/**
 * Uses the SVG.js library Color class constructor to check if a value
 * is a valid SVG color.
 *
 * Only supports string values currently.
 */
export class SVGColor {
  _value: string;

  /**
   * Throws if the provided value is not a valid SVG color string.
   */
  constructor(value: unknown) {
    this._value = '#' + '0'.repeat(6);

    this.setValue(value);
  }

  /**
   * The primitive string value.
   */
  getValue(): string {
    return this._value;
  }

  /**
   * Throws if the provided value is not a valid SVG color string.
   */
  setValue(value: unknown): void | never {
    if (typeof value != 'string') {
      throw new Error(`${value} is not a string.`);
    } else if (isBlank(value)) {
      throw new Error('Value is blank.');
    }

    try {
      // check if will accept the value
      new SVG.Color(value);
    } catch {
      throw new Error(`${value} is not a valid SVG color.`);
    }

    this._value = value;
  }

  /**
   * Returns the saved form of this SVG color (in this case simply the
   * primitive value).
   *
   * The saved form of this SVG color can be directly converted to and
   * from JSON.
   */
  toSaved() {
    return this.getValue();
  }

  /**
   * Sets the value of this SVG color to the saved value.
   */
  applySaved(saved: SavedSVGColor): void;

  /**
   * Since the saved value could have been read from a file, this
   * method is designed to be able to handle any unknown saved value.
   *
   * Invalid saved values and values of undefined are ignored.
   */
  applySaved(saved: unknown): void;

  applySaved(saved: unknown) {
    if (saved === undefined) {
      return;
    }

    try {
      this.setValue(saved);
    } catch {}
  }
}
