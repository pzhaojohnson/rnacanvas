import type { Bond } from 'Draw/bonds/Bond';

export type Base1 = Bond['base1'];
export type Base2 = Bond['base2'];

export interface BasePadding1Optimizer {
  /**
   * Optimizes base padding 1 of the bond.
   */
  applyTo(bond: Bond): void;
}

export interface BasePadding2Optimizer {
  /**
   * Optimizes base padding 2 of the bond.
   */
  applyTo(bond: Bond): void;
}

export type ConstructorArgs = {
  basePadding1Optimizer: BasePadding1Optimizer;
  basePadding2Optimizer: BasePadding2Optimizer;
};

export class BasePaddingsOptimizer {
  readonly _basePadding1Optimizer: BasePadding1Optimizer;
  readonly _basePadding2Optimizer: BasePadding2Optimizer;

  constructor(args: ConstructorArgs) {
    let { basePadding1Optimizer, basePadding2Optimizer } = args;

    this._basePadding1Optimizer = basePadding1Optimizer;
    this._basePadding2Optimizer = basePadding2Optimizer;
  }

  /**
   * Optimizes base paddings 1 and 2 of the bond.
   */
  applyTo(bond: Bond) {
    this._basePadding1Optimizer.applyTo(bond);
    this._basePadding2Optimizer.applyTo(bond);
  }
}
