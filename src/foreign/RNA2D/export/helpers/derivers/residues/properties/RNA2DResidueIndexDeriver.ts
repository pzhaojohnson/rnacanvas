export interface OrderingGetter<RNAcanvasBase> {
  /**
   * Returns an ordering of RNAcanvas bases in the form of an array
   * of RNAcanvas bases.
   */
  get(): RNAcanvasBase[];
}

export type Helpers<RNAcanvasBase> = {
  orderingGetter: OrderingGetter<RNAcanvasBase>;
};

export class RNA2DResidueIndexDeriver<RNAcanvasBase> {
  _helpers: Helpers<RNAcanvasBase>;

  constructor(helpers: Helpers<RNAcanvasBase>) {
    this._helpers = helpers;
  }

  /**
   * Derives the index of an RNA 2D residue from its corresponding
   * RNAcanvas base.
   *
   * Specifically, returns the index of the corresponding RNAcanvas
   * base in the ordering of RNAcanvas bases returned by the helper
   * ordering getter.
   *
   * Returns -1 if the corresponding RNAcanvas base is not present
   * in the ordering of RNAcanvas bases returned by the helper
   * ordering getter.
   */
  deriveFrom(correspondingRNAcanvasBase: RNAcanvasBase): number {
    let theOrderingOfRNAcanvasBases = this._helpers.orderingGetter.get();

    return theOrderingOfRNAcanvasBases.indexOf(correspondingRNAcanvasBase);
  }
}
