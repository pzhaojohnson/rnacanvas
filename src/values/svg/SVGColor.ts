import * as SVG from '@svgdotjs/svg.js';

import { isBlank } from 'Parse/isBlank';

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
}
