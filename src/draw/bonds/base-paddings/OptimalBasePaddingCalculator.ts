export interface Base {
  text: {
    bbox(): {
      width: number;
      height: number;
    };
  };
}

export class OptimalBasePaddingCalculator {
  /**
   * Calculates an optimal base padding for bonds attached to the
   * base.
   */
  calculateFor(b: Base): number {
    let bbox = b.text.bbox();
    let size = Math.max(bbox.width, bbox.height);
    return size / 2;
  }
}
