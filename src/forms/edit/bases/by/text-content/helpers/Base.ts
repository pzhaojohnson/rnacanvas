/**
 * The interface for bases used by the form for selecting bases by
 * their text contents.
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
