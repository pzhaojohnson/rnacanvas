/**
 * A base in a structure drawing.
 */
export interface Base {
  /**
   * The text element of the base.
   *
   * Assumed to contain the entire text content of the base.
   */
  text: {
    /**
     * Returns the text content of the text element of the base.
     */
    text(): string;
  }
}

export class TextContentGetter {
  /**
   * Returns the text content of the given base.
   */
  getFor(b: Base): string {
    return b.text.text();
  }
}
