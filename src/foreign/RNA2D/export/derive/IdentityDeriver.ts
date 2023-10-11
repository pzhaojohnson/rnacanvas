export class IdentityDeriver<T> {
  /**
   * Simply returns the input value.
   */
  deriveFrom(valueToDeriveFrom: T): T {
    return valueToDeriveFrom;
  }
}
