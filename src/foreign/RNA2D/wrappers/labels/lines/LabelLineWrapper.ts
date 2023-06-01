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

  get x1() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('x1');
  }

  get y1() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('y1');
  }

  get x2() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('x2');
  }

  get y2() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('y2');
  }
}
