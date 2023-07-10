export interface Base {
  text: {
    /**
     * Sets the text content of the base to the given string.
     *
     * Not expected to return anything.
     */
    text(s: string): void | unknown;

    /**
     * Returns the current bounding box of the text element of the
     * base.
     */
    bbox(): {
      /**
       * Center X coordinate.
       */
      readonly cx: number;

      /**
       * Center Y coordinate.
       */
      readonly cy: number;
    }

    /**
     * Centers the text element of the base on the given X and Y
     * coordinates.
     *
     * Not expected to return anything.
     */
    center(x: number, y: number): void | unknown;
  }
}

export type SetMethodArgs = {
  /**
   * The base to set the text content of.
   */
  base: Base;

  /**
   * The new text content for the base.
   */
  textContent: string;
};

/**
 * For setting the text content of a single base.
 */
export class SingleTextContentSetter {
  /**
   * Sets the text content of the provided base.
   */
  set(args: SetMethodArgs) {
    let { base, textContent } = args;

    // must cache before changing the text content
    let bbox = base.text.bbox();
    let cx = bbox.cx;
    let cy = bbox.cy;

    base.text.text(textContent);

    // recenter on previous center coordinates
    base.text.center(cx, cy);
  }
}
