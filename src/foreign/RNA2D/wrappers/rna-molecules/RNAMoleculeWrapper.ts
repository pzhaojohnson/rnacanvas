import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { BasePairWrapper } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

import { ResidueWrapper } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

export class RNAMoleculeWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get basePairs() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('basePairs')
      .map(bp => new BasePairWrapper(bp));
  }

  get name() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('name');
  }

  get sequence() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('sequence')
      .map(r => new ResidueWrapper(r));
  }
}
