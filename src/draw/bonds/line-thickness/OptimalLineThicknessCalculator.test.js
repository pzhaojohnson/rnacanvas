import { OptimalLineThicknessCalculator } from './OptimalLineThicknessCalculator';

describe('OptimalLineThicknessCalculator class', () => {
  describe('calculateFor method', () => {
    test('when base 1 has a larger text element height', () => {
      let scalingFactor = 1.619824124;
      let calculator = new OptimalLineThicknessCalculator({ scalingFactor });

      let bond = {
        base1: { text: { bbox: () => ({ height: 18.2332568 }) } },
        base2: { text: { bbox: () => ({ height: 15.31799 }) } },
      };

      expect(calculator.calculateFor(bond)).toBeCloseTo(29.534669223727043);
    });

    test('when base 2 has a larger text element height', () => {
      let scalingFactor = 0.937249;
      let calculator = new OptimalLineThicknessCalculator({ scalingFactor });

      let bond = {
        base1: { text: { bbox: () => ({ height: 9.273581 }) } },
        base2: { text: { bbox: () => ({ height: 21.3289642 }) } },
      };

      expect(calculator.calculateFor(bond)).toBeCloseTo(19.990550367485802);
    });
  });
});
