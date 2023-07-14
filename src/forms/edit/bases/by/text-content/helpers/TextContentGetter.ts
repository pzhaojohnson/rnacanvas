export interface Base {
  text: {
    /**
     * Returns the text content of the text element of a base.
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
