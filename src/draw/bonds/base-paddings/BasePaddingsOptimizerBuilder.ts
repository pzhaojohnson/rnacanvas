import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

import { BasePadding1Optimizer } from './BasePadding1Optimizer';
import { BasePadding2Optimizer } from './BasePadding2Optimizer';

import { OptimalBasePaddingCalculator2 } from './OptimalBasePaddingCalculator2';

export class BasePaddingsOptimizerBuilder {
  buildForPrimaryBonds() {
    let scalingFactor = 0.689655172413793;

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
    let scalingFactor = 0.541871921182266;

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
    let scalingFactor = 0.7881773399014778;

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
