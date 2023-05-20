import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { RNAMoleculeWrapper } from 'Foreign/RNA2D/wrappers/rna-molecules/RNAMoleculeWrapper';

export class RNAComplexWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get name() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('name');
  }

  get rnaMolecules() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('rnaMolecules')
      .map(rm => new RNAMoleculeWrapper(rm));
  }
}
