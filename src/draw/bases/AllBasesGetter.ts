export interface Drawing<Base> {
  /**
   * Returns all bases in the drawing.
   */
  bases(): Base[];
}

export type AllBasesGetterConstructorParameters<Base> = {
  /**
   * The drawing to return all the bases for.
   */
  drawing: Drawing<Base>;
};

export class AllBasesGetter<Base> {
  _drawing: Drawing<Base>;

  constructor(args: AllBasesGetterConstructorParameters<Base>) {
    this._drawing = args.drawing;
  }

  /**
   * Returns all the bases in the drawing provided to this all-bases
   * getter on construction.
   */
  get(): Base[] {
    return this._drawing.bases();
  }
}
