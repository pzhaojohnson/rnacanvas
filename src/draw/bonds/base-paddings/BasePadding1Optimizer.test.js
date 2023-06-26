import { BasePadding1Optimizer } from './BasePadding1Optimizer';

function createBondMock() {
  return {
    base1: {},
    basePadding1: 0,
  };
}

function createOptimalBasePaddingCalculatorMock() {
  return {
    calculateFor: () => 0,
  };
}

let calculator = null;

let optimizer = null;

beforeEach(() => {
  calculator = createOptimalBasePaddingCalculatorMock();

  optimizer = new BasePadding1Optimizer({
    optimalBasePaddingCalculator: calculator,
  });
});

afterEach(() => {
  optimizer = null;

  calculator = null;
});

describe('BasePadding1Optimizer class', () => {
  describe('applyTo method', () => {
    it('sets base padding 1 to the value returned by the calculator', () => {
      let bond = createBondMock();

      calculator.calculateFor = () => 18.3914;

      expect(bond.basePadding1).not.toBe(18.3914);

      optimizer.applyTo(bond);

      expect(bond.basePadding1).toBe(18.3914);
    });

    it('passes base 1 to the calculator', () => {
      let bond = createBondMock();

      let base1 = {};
      bond.base1 = base1;

      calculator.calculateFor = jest.fn(() => 5);

      expect(calculator.calculateFor).not.toHaveBeenCalled();

      optimizer.applyTo(bond);

      expect(calculator.calculateFor).toHaveBeenCalledTimes(1);
      expect(calculator.calculateFor.mock.calls[0][0]).toBe(base1);
      expect(base1).toBeTruthy();
    });
  });
});
