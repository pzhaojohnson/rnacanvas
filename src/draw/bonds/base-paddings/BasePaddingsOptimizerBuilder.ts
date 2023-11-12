import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

import { BasePadding1Optimizer } from './BasePadding1Optimizer';
import { BasePadding2Optimizer } from './BasePadding2Optimizer';

import { OptimalBasePaddingCalculator2 } from './OptimalBasePaddingCalculator2';

export class BasePaddingsOptimizerBuilder {
  buildForPrimaryBonds() {
    let scalingFactor = 0.590163915972978;

    return new BasePaddingsOptimizer({
      basePadding1Optimizer: new BasePadding1Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
      basePadding2Optimizer: new BasePadding2Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
    });
  }

  buildForSecondaryBonds() {
    let scalingFactor = 0.5049014981555302;

    return new BasePaddingsOptimizer({
      basePadding1Optimizer: new BasePadding1Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
      basePadding2Optimizer: new BasePadding2Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
    });
  }

  buildForTertiaryBonds() {
    let scalingFactor = 0.6147540791385188;

    return new BasePaddingsOptimizer({
      basePadding1Optimizer: new BasePadding1Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
      basePadding2Optimizer: new BasePadding2Optimizer({
        optimalBasePaddingCalculator: new OptimalBasePaddingCalculator2({
          scalingFactor,
        }),
      }),
    });
  }
}
