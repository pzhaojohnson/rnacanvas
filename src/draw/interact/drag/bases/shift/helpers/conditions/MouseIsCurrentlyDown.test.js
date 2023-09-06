import { MouseIsCurrentlyDown } from './MouseIsCurrentlyDown';

let mouseDownListener = null;
let mouseUpListener = null;

let window = null;

let mouseIsCurrentlyDown = null;

beforeEach(() => {
  window = {
    addEventListener: (name, listener) => {
      if (name === 'mousedown') {
        mouseDownListener = listener;
      } else if (name === 'mouseup') {
        mouseUpListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };

  mouseIsCurrentlyDown = new MouseIsCurrentlyDown({ window });
});

afterEach(() => {
  mouseIsCurrentlyDown = null;

  window = null;

  mouseUpListener = null;
  mouseDownListener = null;
});

describe('MouseIsCurrentlyDown class', () => {
  describe('isTrue method', () => {
    test('no mouse events', () => {
      expect(mouseIsCurrentlyDown.isTrue()).toBe(false);
    });

    test('one mouse down event', () => {
      mouseDownListener();
      expect(mouseIsCurrentlyDown.isTrue()).toBe(true);
    });

    test('one mouse up event', () => {
      mouseUpListener();
      expect(mouseIsCurrentlyDown.isTrue()).toBe(false);
    });

    test('multiple mouse down and up events ending with mouse down', () => {
      mouseDownListener();
      mouseUpListener();

      mouseDownListener();
      mouseDownListener();
      mouseUpListener();

      mouseUpListener();
      mouseDownListener();

      expect(mouseIsCurrentlyDown.isTrue()).toBe(true);
    });

    test('multiple mouse down and up events ending with mouse up', () => {
      mouseDownListener();
      mouseUpListener();

      mouseUpListener();
      mouseDownListener();

      mouseDownListener();
      mouseDownListener();
      mouseUpListener();

      expect(mouseIsCurrentlyDown.isTrue()).toBe(false);
    });
  });
});
