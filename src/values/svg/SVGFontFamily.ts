export type Value = string;

/**
 * Currently accepts any string as a value.
 */
export class SVGFontFamily {
  _value: Value;

  /**
   * Throws if the provided value is invalid.
   */
  constructor(value: unknown) {
    // a web-safe font
    this._value = 'Arial';

    this.setValue(value);
  }

  getValue() {
    return this._value;
  }

  /**
   * Throws if the provided value is invalid.
   */
  setValue(value: unknown): void | never {
    if (typeof value == 'string') {
      this._value = value;
    } else {
      throw new Error(`${value} is not a string.`);
    }
  }
}
