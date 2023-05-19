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
}
