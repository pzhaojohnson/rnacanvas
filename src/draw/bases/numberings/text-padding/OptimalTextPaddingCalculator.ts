export interface BaseNumbering {
  readonly text: {
    bbox(): {
      readonly height: number;
    };
  };
}

export class OptimalTextPaddingCalculator {
  /**
   * Calculates an optimal text padding for the base numbering.
   */
  calculateFor(bn: BaseNumbering): number {
    let scalingFactor = 0.35;

    let bbox = bn.text.bbox();

    // calculate purely based on height
    // (due to the way that base numberings are positioned)
    return scalingFactor * bbox.height;
  }
}
