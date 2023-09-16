import { ShiftKeyWasHeldDuringMostRecentMouseDown } from './ShiftKeyWasHeldDuringMostRecentMouseDown';

let mostRecentMouseDownTracker = null;

let shiftKeyWasHeldDuringMostRecentMouseDown = null;

beforeEach(() => {
  mostRecentMouseDownTracker = {
    provide: () => undefined,
  };

  shiftKeyWasHeldDuringMostRecentMouseDown = new ShiftKeyWasHeldDuringMostRecentMouseDown({
    mostRecentMouseDownTracker,
  });
});

afterEach(() => {
  shiftKeyWasHeldDuringMostRecentMouseDown = null;

  mostRecentMouseDownTracker = null;
});

describe('ShiftKeyWasHeldDuringMostRecentMouseDown class', () => {
  describe('isTrue method', () => {
    it('returns false if there have not been any mouse down events', () => {
      mostRecentMouseDownTracker.provide = () => undefined;

      expect(shiftKeyWasHeldDuringMostRecentMouseDown.isTrue()).toBe(false);
    });

    it('returns true if the Shift key was held during the most recent mouse down event', () => {
      mostRecentMouseDownTracker.provide = () => ({ shiftKey: true });

      expect(shiftKeyWasHeldDuringMostRecentMouseDown.isTrue()).toBe(true);
    });

    it('returns false if the Shift key was not held during the most recent mouse down event', () => {
      mostRecentMouseDownTracker.provide = () => ({ shiftKey: false });

      expect(shiftKeyWasHeldDuringMostRecentMouseDown.isTrue()).toBe(false);
    });
  });
});
