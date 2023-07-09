export interface BaseNumbering {
  readonly textPadding: number;
}

export type ConstructorArgs = {
  /**
   * The base numberings to get the text paddings of.
   */
  baseNumberings: BaseNumbering[];
};

export class TextPaddingsGetter {
  readonly _baseNumberings: BaseNumbering[]

  constructor(args: ConstructorArgs) {
    let { baseNumberings } = args;

    this._baseNumberings = baseNumberings;
  }

  /**
   * Returns the text paddings of the base numberings for this text
   * paddings getter.
   */
  get(): number[] {
    return this._baseNumberings.map(bn => bn.textPadding);
  }
}
