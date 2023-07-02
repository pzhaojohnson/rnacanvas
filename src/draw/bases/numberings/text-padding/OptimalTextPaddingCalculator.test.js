import { OptimalTextPaddingCalculator } from './OptimalTextPaddingCalculator';

let calculator = null;

let baseNumbering = null;

beforeEach(() => {
  calculator = new OptimalTextPaddingCalculator();

  baseNumbering = {
    text: {
      bbox: () => ({
        height: 0,
      }),
    },
  };
});

afterEach(() => {
  baseNumbering = null;

  calculator = null;
});

describe('OptimalTextPaddingCalculator class', () => {
  test('calculateFor method', () => {
    baseNumbering.text.bbox = () => ({ height: 29 });

    expect(calculator.calculateFor(baseNumbering)).toBeCloseTo(10.15);
  });
});
