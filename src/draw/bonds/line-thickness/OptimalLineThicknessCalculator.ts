/**
 * A base connected by a bond.
 */
export interface Base {
  text: {
    /**
     * Returns the bounding box of the text element of the base.
     */
    bbox(): {
      height: number;
    }
  }
}

/**
 * A bond connecting two bases.
 */
export interface Bond {
  base1: Base;
  base2: Base;
}

export type ConstructorArgs = {
  scalingFactor: number;
};

export class OptimalLineThicknessCalculator {
  readonly _scalingFactor: number;

  constructor(args: ConstructorArgs) {
    let { scalingFactor } = args;

    this._scalingFactor = scalingFactor;
  }

  /**
   * Calculates an optimal line thickness for the bond.
   *
   * Does so by multiplying the scaling factor for this optimal line
   * thickness calculator by the larger of the two heights for the text
   * elements of the two bases of the bond.
   */
  calculateFor(bond: Bond): number {
    let height1 = bond.base1.text.bbox().height;
    let height2 = bond.base2.text.bbox().height;

    return this._scalingFactor * Math.max(height1, height2);
  }
}
