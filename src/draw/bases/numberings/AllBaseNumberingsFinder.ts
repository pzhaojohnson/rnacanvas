export interface TBase<TBaseNumbering> {
  numbering?: TBaseNumbering | undefined;
}

export interface AllBasesFinder<TDrawing, TBaseNumbering> {
  /**
   * Returns all the bases in the drawing.
   */
  findIn(drawing: TDrawing): TBase<TBaseNumbering>[];
}

export type Helpers<TDrawing, TBaseNumbering> = {
  allBasesFinder: AllBasesFinder<TDrawing, TBaseNumbering>;
};

export class AllBaseNumberingsFinder<TDrawing, TBaseNumbering> {
  _helpers: Helpers<TDrawing, TBaseNumbering>;

  constructor(helpers: Helpers<TDrawing, TBaseNumbering>) {
    this._helpers = helpers;
  }

  /**
   * Returns all the base numberings in the drawing.
   */
  findIn(drawing: TDrawing): TBaseNumbering[] {
    let allBases = this._helpers.allBasesFinder.findIn(drawing);

    let allBaseNumberings: TBaseNumbering[] = [];

    allBases.forEach(b => {
      if (b.numbering) {
        allBaseNumberings.push(b.numbering);
      }
    });

    return allBaseNumberings;
  }
}
