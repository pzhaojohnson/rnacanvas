import { LastMouseDownWasDirectlyOnNode } from './LastMouseDownWasDirectlyOnNode';

let mouseDownListener = null;

let theWindowForTheWholeApp = null;

beforeEach(() => {
  theWindowForTheWholeApp = {
    addEventListener: (name, listener) => {
      if (name === 'mousedown') {
        mouseDownListener = listener;
      } else {
        throw new Error(`Unexpected event name: ${name}.`);
      }
    },
  };
});

afterEach(() => {
  theWindowForTheWholeApp = null;

  mouseDownListener = null;
});

describe('LastMouseDownWasDirectlyOnNode class', () => {
  describe('isTrue method', () => {
    test('a series of mouse down events', () => {
      let targetNode = {};

      let condition = new LastMouseDownWasDirectlyOnNode({ theWindowForTheWholeApp, targetNode });

      mouseDownListener({ target: targetNode });
      expect(condition.isTrue()).toBe(true);

      mouseDownListener({ target: null });
      expect(condition.isTrue()).toBe(false);

      mouseDownListener({ target: targetNode });
      expect(condition.isTrue()).toBe(true);

      mouseDownListener({ target: {} });
      expect(condition.isTrue()).toBe(false);

      mouseDownListener({ target: null });
      mouseDownListener({ target: targetNode });
      mouseDownListener({ target: {} });
      mouseDownListener({ target: null });
      mouseDownListener({ target: targetNode });
      mouseDownListener({ target: {} });
      mouseDownListener({ target: targetNode });
      expect(condition.isTrue()).toBe(true);
    });

    it('returns false when there have not been any mouse down events', () => {
      let condition = new LastMouseDownWasDirectlyOnNode({ theWindowForTheWholeApp, targetNode: {} });

      expect(condition.isTrue()).toBe(false);
    });
  });
});
