import { BasePaddingsOptimizer } from './BasePaddingsOptimizer';

function createBondMock() {
  return {
    base1: {},
    base2: {},
  };
}

let basePadding1Optimizer = null;
let basePadding2Optimizer = null;

let basePaddingsOptimizer = null;

let bond = null;

beforeEach(() => {
  basePadding1Optimizer = { applyTo: jest.fn() };
  basePadding2Optimizer = { applyTo: jest.fn() };

  basePaddingsOptimizer = new BasePaddingsOptimizer({
    basePadding1Optimizer,
    basePadding2Optimizer,
  });

  bond = createBondMock();
});

afterEach(() => {
  bond = null;

  basePaddingsOptimizer = null;

  basePadding1Optimizer = null;
  basePadding2Optimizer = null;
});

describe('BasePaddingsOptimizer class', () => {
  describe('applyTo method', () => {
    it('applies base padding 1 optimizer', () => {
      expect(basePadding1Optimizer.applyTo).not.toHaveBeenCalled();
      basePaddingsOptimizer.applyTo(bond);
      expect(basePadding1Optimizer.applyTo).toHaveBeenCalledTimes(1);

      let call = basePadding1Optimizer.applyTo.mock.calls[0];
      expect(call[0]).toBe(bond);
      expect(bond).toBeTruthy();
    });

    it('applies base padding 2 optimizer', () => {
      expect(basePadding2Optimizer.applyTo).not.toHaveBeenCalled();
      basePaddingsOptimizer.applyTo(bond);
      expect(basePadding2Optimizer.applyTo).toHaveBeenCalledTimes(1);

      let call = basePadding2Optimizer.applyTo.mock.calls[0];
      expect(call[0]).toBe(bond);
      expect(bond).toBeTruthy();
    });
  });
});
