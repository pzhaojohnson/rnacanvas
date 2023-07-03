import { TextPaddingOptimizer } from './TextPaddingOptimizer';

let calculator = null;

let optimizer = null;

beforeEach(() => {
  calculator = {
    calculateFor: () => 0,
  };

  optimizer = new TextPaddingOptimizer({
    optimalTextPaddingCalculator: calculator,
  });
});

afterEach(() => {
  optimizer = null;

  calculator = null;
});

describe('TextPaddingOptimizer class', () => {
  describe('applyTo method', () => {
    it('passes base numbering to the calculator', () => {
      calculator.calculateFor = jest.fn(() => 0);

      let baseNumbering = {};
      optimizer.applyTo(baseNumbering);

      expect(calculator.calculateFor).toHaveBeenCalledTimes(1);
      expect(calculator.calculateFor.mock.calls[0][0]).toBe(baseNumbering);
    });

    it('applies the value returned by the calculator', () => {
      calculator.calculateFor = () => 12.6819;

      let baseNumbering = {};
      optimizer.applyTo(baseNumbering);

      expect(baseNumbering.textPadding).toBe(12.6819);
    });
  });
});
