import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

export class LabelContentWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes');
  }

  get label() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getProperty('label');
  }

  get x() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('x');
  }

  get y() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('y');
  }
}
