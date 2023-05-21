import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

export class LabelLineWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes');
  }
}
