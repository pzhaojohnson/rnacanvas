import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

export class RNAComplexWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get name() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('name');
  }
}
