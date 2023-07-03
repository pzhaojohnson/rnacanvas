import { TextPaddingOptimizer } from './TextPaddingOptimizer';

import { TextPaddingOptimizerBuilder } from './TextPaddingOptimizerBuilder';

describe('TextPaddingOptimizerBuilder class', () => {
  test('build method', () => {
    let builder = new TextPaddingOptimizerBuilder();
    let optimizer = builder.build();
    expect(optimizer).toBeInstanceOf(TextPaddingOptimizer);
    expect(optimizer).toBeTruthy();
  });
});
