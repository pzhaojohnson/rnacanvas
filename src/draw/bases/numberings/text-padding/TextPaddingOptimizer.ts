import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

export interface OptimalTextPaddingCalculator {
  /**
   * Calculates an optimal text padding for the base numbering.
   */
  calculateFor(bn: BaseNumbering): number;
}

export type ConstructorArgs = {
  optimalTextPaddingCalculator: OptimalTextPaddingCalculator;
};

export class TextPaddingOptimizer {
  readonly _optimalTextPaddingCalculator: OptimalTextPaddingCalculator;

  constructor(args: ConstructorArgs) {
    this._optimalTextPaddingCalculator = args.optimalTextPaddingCalculator;
  }

  /**
   * Optimizes the text padding of the base numbering.
   */
  applyTo(bn: BaseNumbering) {
    bn.textPadding = (
      this._optimalTextPaddingCalculator.calculateFor(bn)
    );
  }
}
