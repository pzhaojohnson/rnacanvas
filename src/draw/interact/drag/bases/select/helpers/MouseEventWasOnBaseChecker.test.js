import { MouseEventWasOnBaseChecker } from './MouseEventWasOnBaseChecker';

function createBaseMock() {
  return {
    text: {
      node: {
        contains: () => false,
      },
    },
    outline: {
      circle: {
        node: {
          contains: () => false,
        },
      },
    },
  };
}

function createMouseEventMock() {
  return {
    target: null,
  };
}

let mouseEventWasOnBaseChecker = null;

let b = null;

let mouseEvent = null;

beforeEach(() => {
  mouseEventWasOnBaseChecker = new MouseEventWasOnBaseChecker();

  b = createBaseMock();

  mouseEvent = createMouseEventMock();
});

afterEach(() => {
  mouseEvent = null;

  b = null;

  mouseEventWasOnBaseChecker = null;
});

describe('MouseEventWasOnBaseChecker class', () => {
  describe('checkFor method', () => {
    it('returns false if the mouse event target is not a node', () => {
      b.text.node.contains = () => true;
      b.outline.circle.node.contains = () => true;

      mouseEvent.target = null;

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(false);
    });

    it('passes the mouse event target to the base text node contains method', () => {
      b.text.node.contains = jest.fn(() => false);

      mouseEvent.target = document.createElement('div');

      mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent });

      expect(b.text.node.contains).toHaveBeenCalledTimes(1);

      expect(b.text.node.contains.mock.calls[0][0]).toBe(mouseEvent.target);
      expect(mouseEvent.target).toBeTruthy();
    });

    it('returns true if the text of the base contains the mouse event target', () => {
      b.text.node.contains = () => true;

      b.outline.circle.node.contains = () => false;

      mouseEvent.target = document.createElement('div');

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(true);
    });

    it('passes the mouse event target to the base outline circle node contains method', () => {
      b.outline.circle.node.contains = jest.fn(() => false);

      mouseEvent.target = document.createElement('div');

      mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent });

      expect(b.outline.circle.node.contains).toHaveBeenCalledTimes(1);

      expect(b.outline.circle.node.contains.mock.calls[0][0]).toBe(mouseEvent.target);
      expect(mouseEvent.target).toBeTruthy();
    });

    it('returns true if the base outline circle element contains the mouse event target', () => {
      b.text.node.contains = () => false;

      b.outline.circle.node.contains = () => true;

      mouseEvent.target = document.createElement('div');

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(true);
    });

    it('returns false if neither the text of the base nor the base outline contain the mouse event target', () => {
      b.text.node.contains = () => false;

      b.outline.circle.node.contains = () => false;

      mouseEvent.target = document.createElement('div');

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(false);
    });

    test('base has no outline', () => {
      // return false to prevent possible early return
      // (before the method attempts to inspect the base outline)
      b.text.node.contains = () => false;

      b.outline = undefined;

      mouseEvent.target = document.createElement('div');

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(false);
    });

    test('base outline has no circle element', () => {
      // return false to prevent possible early return
      // (before the method attempts to inspect the base outline)
      b.text.node.contains = () => false;

      b.outline = {
        circle: undefined,
      };

      mouseEvent.target = document.createElement('div');

      expect(mouseEventWasOnBaseChecker.checkFor({ base: b, mouseEvent })).toBe(false);
    });
  });
});
