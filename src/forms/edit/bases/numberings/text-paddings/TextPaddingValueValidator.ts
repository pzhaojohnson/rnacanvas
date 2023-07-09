export class TextPaddingValueValidator {
  /**
   * Returns true if the value is a valid text padding value and false
   * otherwise.
   */
  isValid(value: number): boolean {
    return (
      Number.isFinite(value)
      && value >= 0
    );
  }
}
