import { round } from 'Math/round';

export interface TextPaddingsGetter {
  /**
   * Returns the text paddings of some base numberings.
   */
  get(): number[];
}

export type ConstructorArgs = {
  /**
   * Gets the text paddings of some base numberings.
   */
  textPaddingsGetter: TextPaddingsGetter;

  /**
   * The number of decimal places to round to.
   */
  places: number;
};

export class RoundedTextPaddingsGetter {
  readonly _textPaddingsGetter: TextPaddingsGetter;

  readonly _places: number;

  constructor(args: ConstructorArgs) {
    let { textPaddingsGetter, places } = args;

    this._textPaddingsGetter = textPaddingsGetter;

    this._places = places;
  }

  /**
   * Returns the rounded text paddings for some base numberings.
   */
  get(): number[] {
    let textPaddings = this._textPaddingsGetter.get();

    return textPaddings.map(tp => round(tp, this._places));
  }
}
