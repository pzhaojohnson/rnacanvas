import { LineThicknessOptimizer } from './LineThicknessOptimizer';

import { OptimalLineThicknessCalculator } from './OptimalLineThicknessCalculator';

import { StraightBondLineThicknessSetter } from './StraightBondLineThicknessSetter';

import { CurvedBondLineThicknessSetter } from './CurvedBondLineThicknessSetter';

import type { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import type { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

import type { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';

export class LineThicknessOptimizerBuilder {
  /**
   * Builds a line thickness optimizer that can be applied to primary
   * bonds.
   */
  buildForPrimaryBonds() {
    return new LineThicknessOptimizer<PrimaryBond>({
      optimalLineThicknessCalculator: new OptimalLineThicknessCalculator({
        scalingFactor: 0.1229507927611445,
      }),
      lineThicknessSetter: new StraightBondLineThicknessSetter(),
    });
  }

  /**
   * Builds a line thickness optimizer that can be applied to
   * secondary bonds.
   */
  buildForSecondaryBonds() {
    return new LineThicknessOptimizer<SecondaryBond>({
      optimalLineThicknessCalculator: new OptimalLineThicknessCalculator({
        scalingFactor: 0.1967212684178312,
      }),
      lineThicknessSetter: new StraightBondLineThicknessSetter(),
    });
  }

  /**
   * Builds a line thickness optimizer that can be applied to tertiary
   * bonds.
   */
  buildForTertiaryBonds() {
    return new LineThicknessOptimizer<TertiaryBond>({
      optimalLineThicknessCalculator: new OptimalLineThicknessCalculator({
        scalingFactor: 0.1622950616686384,
      }),
      lineThicknessSetter: new CurvedBondLineThicknessSetter(),
    });
  }
}
