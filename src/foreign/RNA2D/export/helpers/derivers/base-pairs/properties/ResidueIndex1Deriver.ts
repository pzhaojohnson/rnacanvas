export interface RNAcanvasSecondaryBond<RNAcanvasBase> {
  base1: RNAcanvasBase;
}

export interface AGeneralResidueIndexDeriver<RNAcanvasBase> {
  /**
   * Derives the index of an RNA 2D residue from its corresponding
   * RNAcanvas base.
   */
  deriveFrom(correspondingRNAcanvasBase: RNAcanvasBase): number;
}

export class ResidueIndex1Deriver<RNAcanvasBase> {
  _aGeneralResidueIndexDeriver: AGeneralResidueIndexDeriver<RNAcanvasBase>;

  constructor(aGeneralResidueIndexDeriver: AGeneralResidueIndexDeriver<RNAcanvasBase>) {
    this._aGeneralResidueIndexDeriver = aGeneralResidueIndexDeriver;
  }

  /**
   * Derives the first residue index for an RNA 2D base-pair from
   * its corresponding RNAcanvas secondary bond.
   */
  deriveFrom(correspondingRNAcanvasSecondaryBond: RNAcanvasSecondaryBond<RNAcanvasBase>): number {
    return this._aGeneralResidueIndexDeriver.deriveFrom(correspondingRNAcanvasSecondaryBond.base1);
  }
}
