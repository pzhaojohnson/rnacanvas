import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { BasePairWrapper } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

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
}
