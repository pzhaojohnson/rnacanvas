import { MouseHasMovedSinceMostRecentMouseDown } from './MouseHasMovedSinceMostRecentMouseDown';

let mouseDownListener = null;
let mouseMoveListener = null;

let window = null;

let mouseHasMovedSinceMostRecentMouseDown = null;

beforeEach(() => {
  window = {
    addEventListener: (name, listener) => {
      if (name === 'mousedown') {
        mouseDownListener = listener;
      } else if (name === 'mousemove') {
        mouseMoveListener = listener;
      } else {
        throw new Error(`Unexpected event name ${name}.`);
      }
    },
  };

  mouseHasMovedSinceMostRecentMouseDown = new MouseHasMovedSinceMostRecentMouseDown({
    window,
  });
});

afterEach(() => {
  mouseHasMovedSinceMostRecentMouseDown = null;

  window = null;

  mouseMoveListener = null;
  mouseDownListener = null;
});

describe('MouseHasMovedSinceMostRecentMouseDown class', () => {
  describe('isTrue method', () => {
    it('returns true when the mouse has moved since the most recent mouse down event', () => {
      mouseDownListener();
      mouseMoveListener();
      expect(mouseHasMovedSinceMostRecentMouseDown.isTrue()).toBe(true);
    });

    it('returns false when the mouse has not moved since the most recent mouse down event', () => {
      mouseMoveListener();
      mouseMoveListener();

      mouseDownListener();
      expect(mouseHasMovedSinceMostRecentMouseDown.isTrue()).toBe(false);
    });

    it('always returns false when there have not been any mouse down events', () => {
      expect(mouseHasMovedSinceMostRecentMouseDown.isTrue()).toBe(false);

      mouseMoveListener();
      expect(mouseHasMovedSinceMostRecentMouseDown.isTrue()).toBe(false);

      mouseMoveListener();
      mouseMoveListener();
      expect(mouseHasMovedSinceMostRecentMouseDown.isTrue()).toBe(false);
    });
  });
});
