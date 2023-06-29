import { OptimalBasePaddingCalculator2 } from './OptimalBasePaddingCalculator2';

function createBaseMock() {
  return {
    text: {
      bbox: () => ({
        width: 0,
        height: 0,
      }),
    },
  };
}

describe('OptimalBasePaddingCalculator2 class', () => {
  describe('calculateFor method', () => {
    test('when the text width of the base is bigger', () => {
      let b = createBaseMock();
      b.text.bbox = () => ({ width: 18, height: 15 });

      let scalingFactor = 0.7;
      let calculator = new OptimalBasePaddingCalculator2({ scalingFactor });

      expect(calculator.calculateFor(b)).toBeCloseTo(12.6);
    });

    test('when the text height of the base is bigger', () => {
      let b = createBaseMock();
      b.text.bbox = () => ({ width: 33, height: 41 });

      let scalingFactor = 1.1;
      let calculator = new OptimalBasePaddingCalculator2({ scalingFactor });

      expect(calculator.calculateFor(b)).toBeCloseTo(45.1);
    });
  });
});
