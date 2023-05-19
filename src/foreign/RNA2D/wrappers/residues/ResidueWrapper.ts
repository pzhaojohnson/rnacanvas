import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

/**
 * Wraps a residue in an RNA 2D schema.
 */
export class ResidueWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get classes() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getArrayProperty('classes');
  }

  get residueIndex() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('residueIndex');
  }

  get residueName() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getStringProperty('residueName');
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
