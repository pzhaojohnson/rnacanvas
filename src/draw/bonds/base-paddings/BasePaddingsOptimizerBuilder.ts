import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

import { BasePadding1Optimizer } from './BasePadding1Optimizer';
import { BasePadding2Optimizer } from './BasePadding2Optimizer';

import { OptimalBasePaddingCalculator } from './OptimalBasePaddingCalculator';

export class BasePaddingsOptimizerBuilder {
  build() {
    return new BasePaddingsOptimizer({
      basePadding1Optimizer: new BasePadding1Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator(),
      }),
      basePadding2Optimizer: new BasePadding2Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator(),
      }),
    });
  }
}
