import { OptimalBasePaddingCalculator } from './OptimalBasePaddingCalculator';

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

let calculator = null;

beforeEach(() => {
  calculator = new OptimalBasePaddingCalculator();
});

afterEach(() => {
  calculator = null;
});

describe('OptimalBasePaddingCalculator class', () => {
  describe('calculateFor method', () => {
    test('when the text width of the base is bigger', () => {
      let b = createBaseMock();
      b.text.bbox = () => ({ width: 32, height: 22 });
      expect(calculator.calculateFor(b)).toBeCloseTo(16);
    });

    test('when the text height of the base is bigger', () => {
      let b = createBaseMock();
      b.text.bbox = () => ({ width: 54, height: 62 });
      expect(calculator.calculateFor(b)).toBeCloseTo(31);
    });
  });
});
