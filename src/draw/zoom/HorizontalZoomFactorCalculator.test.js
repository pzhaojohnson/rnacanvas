import { HorizontalZoomFactorCalculator } from './HorizontalZoomFactorCalculator';

describe('HorizontalZoomFactorCalculator class', () => {
  describe('calculate method', () => {
    it('divides drawing SVG document client width by view box width', () => {
      let drawing = {
        svg: {
          viewbox: () => ({ width: 1928 }),
          node: {
            getBoundingClientRect: () => ({ width: 592 }),
          },
        },
      };

      let calculator = new HorizontalZoomFactorCalculator({ drawing });

      expect(calculator.calculate()).toBeCloseTo(592 / 1928);
    });
  });
});
