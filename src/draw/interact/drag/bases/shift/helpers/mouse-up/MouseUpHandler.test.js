import { MouseUpHandler } from './MouseUpHandler';

let shouldRespondToMouseUpDecider = null;

let selectedBasesGetter = null;

let basesShifter = null;

let basesShiftCalculator = null;

let mouseUpHandler = null;

beforeEach(() => {
  shouldRespondToMouseUpDecider = {
    decide: () => false,
  };

  selectedBasesGetter = {
    get: () => [],
  };

  basesShifter = {
    shiftBases: () => {},
  };

  basesShiftCalculator = {
    calculateFor: () => ({ x: 0, y: 0 }),
  };

  mouseUpHandler = new MouseUpHandler({
    shouldRespondToMouseUpDecider,
    selectedBasesGetter,
    basesShifter,
    basesShiftCalculator,
  });
});

afterEach(() => {
  mouseUpHandler = null;

  basesShiftCalculator = null;

  basesShifter = null;

  selectedBasesGetter = null;

  shouldRespondToMouseUpDecider = null;
});

describe('MouseUpHandler class', () => {
  describe('handle method', () => {
    it('does nothing if the should-respond-to-mouse-up decider says not to', () => {
      shouldRespondToMouseUpDecider.decide = () => false;

      basesShifter.shiftBases = jest.fn();

      mouseUpHandler.handle('A mouse up event');

      expect(basesShifter.shiftBases).not.toHaveBeenCalled();
    });

    it('passes the mouse up event to the bases shift calculator', () => {
      shouldRespondToMouseUpDecider.decide = () => true;

      basesShiftCalculator.calculateFor = jest.fn(() => ({ x: 0, y: 0 }));

      mouseUpHandler.handle('Mouse up - 2938uuriqewfka');

      expect(basesShiftCalculator.calculateFor).toHaveBeenCalledTimes(1);
      expect(basesShiftCalculator.calculateFor.mock.calls[0][0]).toBe('Mouse up - 2938uuriqewfka');
    });

    it('shifts selected bases by the X and Y amounts calculated by the bases shift calculator', () => {
      shouldRespondToMouseUpDecider.decide = () => true;

      selectedBasesGetter.get = () => ['base - 18934', 'base - 982ur', 'base 09ir3', 'base - ajdsf9'];

      basesShiftCalculator.calculateFor = () => ({ x: 89.239, y: -238.29 });

      basesShifter.shiftBases = jest.fn();

      mouseUpHandler.handle('A mouse up event');

      expect(basesShifter.shiftBases).toHaveBeenCalledTimes(1);
      let call = basesShifter.shiftBases.mock.calls[0];

      expect(call[0].bases).toStrictEqual(['base - 18934', 'base - 982ur', 'base 09ir3', 'base - ajdsf9']);

      expect(call[0].x).toBe(89.239);
      expect(call[0].y).toBe(-238.29);
    });
  });
});
