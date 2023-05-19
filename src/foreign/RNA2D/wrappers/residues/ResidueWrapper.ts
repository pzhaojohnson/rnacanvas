/**
 * Wraps a residue in an RNA 2D schema.
 */
export class ResidueWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }
}
