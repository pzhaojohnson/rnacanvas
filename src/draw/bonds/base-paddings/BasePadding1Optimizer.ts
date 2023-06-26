export interface Base {
  readonly text: {
    bbox(): {
      readonly width: number;
      readonly height: number;
    };
  };
}

export interface Bond {
  readonly base1: Base;

  /**
   * Normally expected to be a number.
   */
  basePadding1: number | unknown;
}

export interface OptimalBasePaddingCalculator {
  /**
   * Calculates an optimal base padding for bonds attached to the
   * base.
   */
  calculateFor(b: Base): number;
}

export type ConstructorArgs = {
  optimalBasePaddingCalculator: OptimalBasePaddingCalculator;
};

export class BasePadding1Optimizer {
  readonly _optimalBasePaddingCalculator: OptimalBasePaddingCalculator;

  constructor(args: ConstructorArgs) {
    let { optimalBasePaddingCalculator } = args;

    this._optimalBasePaddingCalculator = optimalBasePaddingCalculator;
  }

  /**
   * Sets base padding 1 of the bond to an optimal value.
   */
  applyTo(bond: Bond) {
    bond.basePadding1 = (
      this._optimalBasePaddingCalculator.calculateFor(bond.base1)
    );
  }
}
