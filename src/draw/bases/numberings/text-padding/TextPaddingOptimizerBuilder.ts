import { TextPaddingOptimizer } from './TextPaddingOptimizer';

import { OptimalTextPaddingCalculator } from './OptimalTextPaddingCalculator';

export class TextPaddingOptimizerBuilder {
  build() {
    return new TextPaddingOptimizer({
      optimalTextPaddingCalculator: new OptimalTextPaddingCalculator(),
    });
  }
}
