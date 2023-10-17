export interface RNAcanvasBase {
  text: {
    /**
     * Returns the bounding box of the RNAcanvas base text element.
     */
    bbox(): {
      /**
       * Center Y coordinate.
       */
      cy: number;
    }
  }
}

export class RNA2DResidueYDeriver {
  /**
   * Returns the Y coordinate for an RNA 2D residue from a
   * corresponding RNAcanvas base.
   */
  deriveFrom(correspondingRNAcanvasBase: RNAcanvasBase): number {
    return correspondingRNAcanvasBase.text.bbox().cy;
  }
}
