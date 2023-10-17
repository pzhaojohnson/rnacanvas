export type Helpers<RNA2DRNAMolecule> = {
  /**
   * Derives all corresponding RNA 2D RNA molecules from the relevant
   * RNAcanvas drawing.
   */
  allRNA2DRNAMoleculesDeriver: {
    derive(): RNA2DRNAMolecule[];
  }
};

export class RNA2DSchemaDeriver<RNA2DRNAMolecule> {
  _helpers: Helpers<RNA2DRNAMolecule>;

  constructor(helpers: Helpers<RNA2DRNAMolecule>) {
    this._helpers = helpers;
  }

  /**
   * Derives an RNA 2D schema from the relevant RNAcanvas drawing.
   *
   * The derived RNA 2D schema should be JSON serializable.
   */
  derive() {
    return {
      classes: [],
      rnaComplexes: [
        {
          name: 'complex',
          rnaMolecules: this._helpers.allRNA2DRNAMoleculesDeriver.derive(),
        },
      ],
    };
  }
}
