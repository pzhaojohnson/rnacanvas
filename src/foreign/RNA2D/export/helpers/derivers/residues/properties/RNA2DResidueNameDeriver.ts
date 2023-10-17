export interface RNAcanvasBase {
  text: {
    /**
     * Returns the text content of the text element of the RNAcanvas
     * base.
     */
    text(): string;
  }
}

export class RNA2DResidueNameDeriver {
  /**
   * Returns the name for an RNA 2D residue from a corresponding
   * RNAcanvas base.
   *
   * In this case, returns the text content of the corresponding
   * RNAcanvas base text element.
   */
  deriveFrom(correspondingRNAcanvasBase: RNAcanvasBase): string {
    return correspondingRNAcanvasBase.text.text();
  }
}
