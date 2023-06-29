export interface Base {
  text: {
    bbox(): {
      width: number;
      height: number;
    }
  }
}

export type ConstructorArgs = {
  /**
   * The factor used to scale base paddings by relative to the size
   * of bases.
   */
  scalingFactor: number;
};

/**
 * An optimal base padding calculator for which a scaling factor can
 * be specified.
 */
export class OptimalBasePaddingCalculator2 {
  readonly _scalingFactor: number;

  constructor(args: ConstructorArgs) {
    this._scalingFactor = args.scalingFactor;
  }

  /**
   * Calculates an optimal base padding for a bond attached to the
   * base.
   *
   * Uses the scaling factor specified for this calculator to
   * calculate an optimal base padding.
   */
  calculateFor(b: Base): number {
    let bbox = b.text.bbox();
    let size = Math.max(bbox.width, bbox.height);
    return size * this._scalingFactor;
  }
}
