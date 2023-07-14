/**
 * A structure drawing in the app.
 */
export interface Drawing<Base> {
  /**
   * Returns all bases in the drawing.
   */
  bases(): Base[];
}

export type ConstructorArgs<Base> = {
  /**
   * The drawing to get all the bases for.
   */
  drawing: Drawing<Base>;
};

export class AllBasesGetter<Base> {
  readonly _drawing: Drawing<Base>;

  constructor(args: ConstructorArgs<Base>) {
    let { drawing } = args;

    this._drawing = drawing;
  }

  /**
   * Returns all the bases in the drawing for this all-bases getter.
   */
  get(): Base[] {
    return this._drawing.bases();
  }
}
