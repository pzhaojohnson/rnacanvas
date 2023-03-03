export const keywordValues = [
  'normal',
  'italic',
  'oblique',
] as const;

export type KeywordValue = typeof keywordValues[number];

function isKeywordValue(value: unknown): value is KeywordValue {
  let kvs: unknown[] = [...keywordValues];
  return kvs.includes(value);
}

/**
 * Right now can only be a keyword value.
 */
export type Value = (
  KeywordValue
);

export class SVGFontStyle {
  _value: Value;

  /**
   * Throws if the provided value is invalid.
   */
  constructor(value: unknown) {
    this._value = 'normal';

    this.setValue(value);
  }

  getValue() {
    return this._value;
  }

  /**
   * Throws if the provided value is invalid.
   */
  setValue(value: unknown): void | never {
    if (isKeywordValue(value)) {
      this._value = value;
    } else {
      throw new Error(`${value} is not a possible value.`);
    }
  }
}
