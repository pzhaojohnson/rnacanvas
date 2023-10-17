export interface Deriver<T> {
  /**
   * Derives a value.
   */
  derive(): T;
}

export type Helpers<RNA2DResidue, RNA2DBasePair, RNA2DLabel> = {
  /**
   * Derives the name that will be assigned to derived RNA 2D RNA
   * molecules.
   */
  nameDeriver: Deriver<string>;

  /**
   * Derives the RNA 2D residues to be included in derived RNA 2D
   * RNA molecules.
   */
  rna2DResiduesDeriver: Deriver<RNA2DResidue[]>;

  /**
   * Derives the RNA 2D base-pairs to be included in derived RNA 2D
   * RNA molecules.
   */
  rna2DBasePairsDeriver: Deriver<RNA2DBasePair[]>;

  /**
   * Derives the RNA 2D labels to be included in derived RNA 2D RNA
   * molecules.
   */
  rna2DLabelsDeriver: Deriver<RNA2DLabel[]>;
};

export class RNA2DRNAMoleculeDeriver<RNA2DResidue, RNA2DBasePair, RNA2DLabel> {
  _helpers: Helpers<RNA2DResidue, RNA2DBasePair, RNA2DLabel>;

  constructor(helpers: Helpers<RNA2DResidue, RNA2DBasePair, RNA2DLabel>) {
    this._helpers = helpers;
  }

  /**
   * Derives an RNA 2D RNA molecule having the name, residues,
   * base-pairs, and labels derived by its helper derivers.
   */
  derive() {
    return {
      name: this._helpers.nameDeriver.derive(),
      sequence: this._helpers.rna2DResiduesDeriver.derive(),
      basePairs: this._helpers.rna2DBasePairsDeriver.derive(),
      labels: this._helpers.rna2DLabelsDeriver.derive(),
    };
  }
}
