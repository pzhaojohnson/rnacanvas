export const keywordValues = [
  'normal',
  'bold',
  'bolder',
  'lighter',
] as const;

export type KeywordValue = typeof keywordValues[number];

/**
 * Can be a keyword or a number between 1 and 1000, inclusive.
 */
export type Value = (
  KeywordValue
  | number
);

export class SVGFontWeight {
  _value: Value;

  /**
   * Throws if the provided value is invalid.
   */
  constructor(value: unknown) {
    this._value = 'normal';

    this.setValue(value);
  }

  getValue(): Value {
    return this._value;
  }

  /**
   * Throws if the provided value is invalid.
   */
  setValue(value: unknown): void | never {
    let kvs: unknown[] = [...keywordValues];
    let i = kvs.indexOf(value);

    if (i > -1) {
      this._value = keywordValues[i];
      return;
    }

    if (typeof value == 'number' && value >= 1 && value <= 1000) {
      this._value = value;
      return;
    }

    throw new Error(`${value} is not a possible value.`);
  }
}
