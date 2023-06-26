export interface Base {
  readonly text: {
    bbox(): {
      readonly width: number;
      readonly height: number;
    };
  };
}

export interface Bond {
  readonly base2: Base;

  /**
   * Normally expected to be a number.
   */
  basePadding2: number | unknown;
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

export class BasePadding2Optimizer {
  readonly _optimalBasePaddingCalculator: OptimalBasePaddingCalculator;

  constructor(args: ConstructorArgs) {
    let { optimalBasePaddingCalculator } = args;

    this._optimalBasePaddingCalculator = optimalBasePaddingCalculator;
  }

  /**
   * Sets base padding 2 of the bond to an optimal value.
   */
  applyTo(bond: Bond) {
    bond.basePadding2 = (
      this._optimalBasePaddingCalculator.calculateFor(bond.base2)
    );
  }
}
