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
}
