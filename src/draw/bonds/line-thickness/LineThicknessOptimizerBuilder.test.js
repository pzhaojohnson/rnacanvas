import { LineThicknessOptimizer } from './LineThicknessOptimizer';

import { LineThicknessOptimizerBuilder } from './LineThicknessOptimizerBuilder';

let builder = null;

beforeEach(() => {
  builder = new LineThicknessOptimizerBuilder();
});

afterEach(() => {
  builder = null;
});

describe('LineThicknessOptimizerBuilder class', () => {
  describe('buildForPrimaryBonds method', () => {
    it('returns a line thickness optimizer', () => {
      let built = builder.buildForPrimaryBonds();
      expect(built).toBeInstanceOf(LineThicknessOptimizer);
    });
  });

  describe('buildForSecondaryBonds method', () => {
    it('returns a line thickness optimizer', () => {
      let built = builder.buildForSecondaryBonds();
      expect(built).toBeInstanceOf(LineThicknessOptimizer);
    });
  });

  describe('buildForTertiaryBonds method', () => {
    it('returns a line thickness optimizer', () => {
      let built = builder.buildForTertiaryBonds();
      expect(built).toBeInstanceOf(LineThicknessOptimizer);
    });
  });
});
