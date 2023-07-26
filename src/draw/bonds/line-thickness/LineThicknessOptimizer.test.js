import { LineThicknessOptimizer } from './LineThicknessOptimizer';

let calculator = null;

let setter = null;

let optimizer = null;

beforeEach(() => {
  calculator = {
    calculateFor: () => 0,
  };

  setter = {
    set: () => {},
  };

  optimizer = new LineThicknessOptimizer({
    optimalLineThicknessCalculator: calculator,
    lineThicknessSetter: setter,
  });
});

afterEach(() => {
  optimizer = null;

  setter = null;

  calculator = null;
});

describe('LineThicknessOptimizer class', () => {
  describe('applyTo method', () => {
    it('passes the bond to the optimal line thickness calculator', () => {
      let bond = 'bond - 18935326831';

      calculator.calculateFor = jest.fn(() => 0);

      optimizer.applyTo(bond);

      expect(calculator.calculateFor).toHaveBeenCalledTimes(1);

      let call = calculator.calculateFor.mock.calls[0];
      expect(call[0]).toBe('bond - 18935326831');
    });

    it('passes the bond and calculated value to the setter', () => {
      let bond = 'bond - 4902r3ehudsa89';

      calculator.calculateFor = () => 12.398132428;

      setter.set = jest.fn();

      optimizer.applyTo(bond);

      expect(setter.set).toHaveBeenCalledTimes(1);

      let call = setter.set.mock.calls[0];
      expect(call[0].bond).toBe('bond - 4902r3ehudsa89');
      expect(call[0].lineThickness).toBe(12.398132428);
    });
  });
});
