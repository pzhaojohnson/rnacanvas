export interface ATextElement {
  /**
   * Returns the bounding box of the text element.
   */
  bbox(): {
    /**
     * Center X coordinate.
     */
    cx: number;

    /**
     * Center Y coordinate.
     */
    cy: number;
  }
}

export interface Point {
  x: number;
  y: number;
}

export class TextCenterPointDeriver {
  /**
   * Returns the center point of a text element.
   */
  deriveFrom(text: ATextElement): Point {
    let bbox = text.bbox();

    return {
      x: bbox.cx,
      y: bbox.cy,
    };
  }
}
