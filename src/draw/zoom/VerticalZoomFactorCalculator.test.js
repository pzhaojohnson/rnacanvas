import { VerticalZoomFactorCalculator } from './VerticalZoomFactorCalculator';

describe('VerticalZoomFactorCalculator class', () => {
  describe('calculate method', () => {
    it('divides drawing SVG document client height by view box height', () => {
      let drawing = {
        svg: {
          viewbox: () => ({ height: 391 }),
          node: {
            getBoundingClientRect: () => ({ height: 831 }),
          },
        },
      };

      let calculator = new VerticalZoomFactorCalculator({ drawing });

      expect(calculator.calculate()).toBeCloseTo(831 / 391);
    });
  });
});
