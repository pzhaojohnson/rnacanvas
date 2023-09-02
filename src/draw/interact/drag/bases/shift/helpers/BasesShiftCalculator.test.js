import { BasesShiftCalculator } from './BasesShiftCalculator';

let mostRecentMouseDownTracker = null;

let horizontalZoomFactorCalculator = null;

let verticalZoomFactorCalculator = null;

let basesShiftCalculator = null;

beforeEach(() => {
  mostRecentMouseDownTracker = {
    provide: () => ({
      clientX: 0,
      clientY: 0,
    }),
  };

  horizontalZoomFactorCalculator = {
    calculate: () => 1,
  };

  verticalZoomFactorCalculator = {
    calculate: () => 1,
  };

  basesShiftCalculator = new BasesShiftCalculator({
    mostRecentMouseDownTracker,
    horizontalZoomFactorCalculator,
    verticalZoomFactorCalculator,
  });
});

afterEach(() => {
  basesShiftCalculator = null;

  verticalZoomFactorCalculator = null;

  horizontalZoomFactorCalculator = null;

  mostRecentMouseDownTracker = null;
});

describe('BasesShiftCalculator class', () => {
  describe('calculateFor method', () => {
    it('returns zeros if there have not been any mouse down events', () => {
      mostRecentMouseDownTracker.provide = () => undefined;

      let mouseUp = { clientX: 15, clientY: 222 };

      expect(basesShiftCalculator.calculateFor(mouseUp)).toStrictEqual({ x: 0, y: 0 });
    });

    it('subtracts mouse down client coordinates from mouse up client coordinates', () => {
      mostRecentMouseDownTracker.provide = () => ({ clientX: 981, clientY: 414 });

      let mouseUp = { clientX: 8491, clientY: 312 };

      horizontalZoomFactorCalculator.calculate = () => 1;
      verticalZoomFactorCalculator.calculate = () => 1;

      let shift = basesShiftCalculator.calculateFor(mouseUp);
      expect(shift.x).toBeCloseTo(8491 - 981);
      expect(shift.y).toBeCloseTo(312 - 414);
    });

    it('divides the returned shift by horizontal and vertical zoom factors', () => {
      mostRecentMouseDownTracker.provide = () => ({ clientX: 8731, clientY: 19 });

      let mouseUp = { clientX: 3651, clientY: 3817 };

      horizontalZoomFactorCalculator.calculate = () => 0.56;
      verticalZoomFactorCalculator.calculate = () => 3.25;

      let shift = basesShiftCalculator.calculateFor(mouseUp);
      expect(shift.x).toBeCloseTo((3651 - 8731) / 0.56);
      expect(shift.y).toBeCloseTo((3817 - 19) / 3.25);
    });
  });
});
