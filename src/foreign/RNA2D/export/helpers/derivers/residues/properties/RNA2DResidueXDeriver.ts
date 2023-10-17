export interface RNAcanvasBase {
  text: {
    /**
     * Returns the bounding box of the text element of the RNAcanvas
     * base.
     */
    bbox(): {
      /**
       * The center X coordinate.
       */
      cx: number;
    }
  }
}

export class RNA2DResidueXDeriver {
  /**
   * Derives the X coordinate for an RNA 2D residue from a
   * corresponding RNAcanvas base.
   */
  deriveFrom(b: RNAcanvasBase): number {
    return b.text.bbox().cx;
  }
}
