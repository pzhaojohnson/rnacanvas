import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

export class BasePairWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get basePairType() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getProperty('basePairType');
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes');
  }

  get residueIndex1() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('residueIndex1');
  }

  get residueIndex2() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('residueIndex2');
  }
}
