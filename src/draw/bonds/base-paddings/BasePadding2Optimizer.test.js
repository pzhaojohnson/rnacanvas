import { BasePadding2Optimizer } from './BasePadding2Optimizer';

function createBondMock() {
  return {
    base2: {},
    basePadding2: 0,
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

  optimizer = new BasePadding2Optimizer({
    optimalBasePaddingCalculator: calculator,
  });
});

afterEach(() => {
  optimizer = null;

  calculator = null;
});

describe('BasePadding2Optimizer class', () => {
  describe('applyTo method', () => {
    it('sets base padding 2 to the value returned by the calculator', () => {
      let bond = createBondMock();

      calculator.calculateFor = () => 9.09783;

      expect(bond.basePadding2).not.toBe(9.09783);

      optimizer.applyTo(bond);

      expect(bond.basePadding2).toBe(9.09783);
    });

    it('passes base 2 to the calculator', () => {
      let bond = createBondMock();

      let base2 = {};
      bond.base2 = base2;

      calculator.calculateFor = jest.fn(() => 3);

      expect(calculator.calculateFor).not.toHaveBeenCalled();

      optimizer.applyTo(bond);

      expect(calculator.calculateFor).toHaveBeenCalledTimes(1);
      expect(calculator.calculateFor.mock.calls[0][0]).toBe(base2);
      expect(base2).toBeTruthy();
    });
  });
});
