import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

import { BasePaddingsOptimizerBuilder } from './BasePaddingsOptimizerBuilder';

describe('BasePaddingsOptimizerBuilder class', () => {
  test('build method', () => {
    let builder = new BasePaddingsOptimizerBuilder();
    let optimizer = builder.build();
    expect(optimizer).toBeInstanceOf(BasePaddingsOptimizer);
  });
});
