export interface RoundedTextPaddingsGetter {
  /**
   * Returns the text paddings for some base numberings already
   * rounded to a desired level of precision.
   */
  get(): number[];
}

export type ConstructorArgs = {
  roundedTextPaddingsGetter: RoundedTextPaddingsGetter;
};

export class ValueToDisplayDeterminer {
  readonly _roundedTextPaddingsGetter: RoundedTextPaddingsGetter;

  constructor(args: ConstructorArgs) {
    let { roundedTextPaddingsGetter } = args;

    this._roundedTextPaddingsGetter = roundedTextPaddingsGetter;
  }

  /**
   * Returns the value to display to the user given the current text
   * padding values.
   */
  determine(): string {
    let roundedTextPaddings = new Set(
      this._roundedTextPaddingsGetter.get()
    );

    if (roundedTextPaddings.size == 1) {
      return roundedTextPaddings.values().next().value.toString();
    } else {
      return '';
    }
  }
}
