export class TextContentValidator {
  /**
   * Returns true if the given text content is valid text content for
   * a base.
   *
   * Returns false otherwise.
   */
  isValid(textContent: string): boolean {
    // remove leading and trailing whitespace
    textContent = textContent.trim();

    // as long as was not entirely whitespace
    return textContent.length > 0;
  }
}
