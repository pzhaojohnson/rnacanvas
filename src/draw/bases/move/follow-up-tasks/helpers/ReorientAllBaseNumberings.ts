/**
 * A function that will reorient all the base numberings in a given
 * drawing.
 */
export interface ReorientAllBaseNumberingsFn<Drawing> {
  (drawing: Drawing): void;
}

export type ConstructorArgs<Drawing> = {
  /**
   * The drawing to reorient base numberings in.
   */
  drawing: Drawing;

  /**
   * The function to use to reorient all base numberings in the
   * drawing.
   */
  reorientAllBaseNumberingsFn: ReorientAllBaseNumberingsFn<Drawing>;
};

/**
 * Represents the task of reorienting all base numberings.
 */
export class ReorientAllBaseNumberings<Drawing> {
  _drawing: Drawing;

  _reorientAllBaseNumberingsFn: ReorientAllBaseNumberingsFn<Drawing>;

  constructor(args: ConstructorArgs<Drawing>) {
    let { drawing, reorientAllBaseNumberingsFn } = args;

    this._drawing = drawing;
    this._reorientAllBaseNumberingsFn = reorientAllBaseNumberingsFn;
  }

  do() {
    let drawing = this._drawing;
    let reorientAllBaseNumberingsFn = this._reorientAllBaseNumberingsFn;

    reorientAllBaseNumberingsFn(drawing);
  }
}
