import { GhostInteractionOverlayShiftCalculator } from './GhostInteractionOverlayShiftCalculator';

let mostRecentMouseDownTracker = null;

let calculator = null;

beforeEach(() => {
  mostRecentMouseDownTracker = {
    provide: () => undefined,
  };

  calculator = new GhostInteractionOverlayShiftCalculator({
    mostRecentMouseDownTracker,
  });
});

afterEach(() => {
  calculator = null;

  mostRecentMouseDownTracker = null;
});

describe('GhostInteractionOverlayShiftCalculator class', () => {
  describe('calculateFor method', () => {
    it('returns zeros if there have not been any mouse down events', () => {
      mostRecentMouseDownTracker.provide = () => undefined;

      let mouseMove = { clientX: 56, clientY: 22 };

      expect(calculator.calculateFor(mouseMove)).toStrictEqual({ x: 0, y: 0 });
    });

    it('subtracts most recent client mouse down coordinates from client mouse move coordinates', () => {
      mostRecentMouseDownTracker.provide = () => ({ clientX: 193, clientY: -328 });

      let mouseMove = { clientX: 339, clientY: 37 };

      expect(calculator.calculateFor(mouseMove)).toStrictEqual({
        x: 339 - 193,
        y: 37 - (-328),
      });
    });
  });
});
