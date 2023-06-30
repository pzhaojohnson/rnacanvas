import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

import { BasePaddingsOptimizerBuilder } from './BasePaddingsOptimizerBuilder';

describe('BasePaddingsOptimizerBuilder class', () => {
  test('buildForPrimaryBonds method', () => {
    let builder = new BasePaddingsOptimizerBuilder();
    let optimizer = builder.buildForPrimaryBonds();
    expect(optimizer).toBeInstanceOf(BasePaddingsOptimizer);
  });

  test('buildForSecondaryBonds method', () => {
    let builder = new BasePaddingsOptimizerBuilder();
    let optimizer = builder.buildForSecondaryBonds();
    expect(optimizer).toBeInstanceOf(BasePaddingsOptimizer);
  });

  test('buildForTertiaryBonds method', () => {
    let builder = new BasePaddingsOptimizerBuilder();
    let optimizer = builder.buildForTertiaryBonds();
    expect(optimizer).toBeInstanceOf(BasePaddingsOptimizer);
  });
});
