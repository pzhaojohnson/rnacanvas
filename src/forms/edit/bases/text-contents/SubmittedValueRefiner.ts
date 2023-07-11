export class SubmittedValueRefiner {
  /**
   * Trims leading and trailing whitespace from the submitted value.
   *
   * The submitted value could, for example, come from a field in a
   * form used to control the text contents of the relevant bases.
   *
   * This method helps to refine the submitted value a bit before the
   * text contents of bases are potentially set to it.
   */
  refine(submittedValue: string): string {
    return submittedValue.trim();
  }
}
