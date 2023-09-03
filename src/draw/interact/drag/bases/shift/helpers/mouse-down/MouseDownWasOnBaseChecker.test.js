import { MouseDownWasOnBaseChecker } from './MouseDownWasOnBaseChecker';

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

function createMouseDownMock() {
  return {
    target: null,
  };
}

let mouseDownWasOnBaseChecker = null;

let b = null;

let mouseDown = null;

beforeEach(() => {
  mouseDownWasOnBaseChecker = new MouseDownWasOnBaseChecker();

  b = createBaseMock();

  mouseDown = createMouseDownMock();
});

afterEach(() => {
  mouseDown = null;

  b = null;

  mouseDownWasOnBaseChecker = null;
});

describe('MouseDownWasOnBaseChecker class', () => {
  describe('checkFor method', () => {
    it('returns false if the mouse down event target is not a node', () => {
      b.text.node.contains = () => true;
      b.outline.circle.node.contains = () => true;

      mouseDown.target = null;

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(false);
    });

    it('passes the mouse down target to the base text node contains method', () => {
      b.text.node.contains = jest.fn(() => false);

      mouseDown.target = document.createElement('div');

      mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown });

      expect(b.text.node.contains).toHaveBeenCalledTimes(1);

      expect(b.text.node.contains.mock.calls[0][0]).toBe(mouseDown.target);
      expect(mouseDown.target).toBeTruthy();
    });

    it('returns true if the text of the base contains the mouse down target', () => {
      b.text.node.contains = () => true;

      b.outline.circle.node.contains = () => false;

      mouseDown.target = document.createElement('div');

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(true);
    });

    it('passes the mouse down target to the base outline circle node contains method', () => {
      b.outline.circle.node.contains = jest.fn(() => false);

      mouseDown.target = document.createElement('div');

      mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown });

      expect(b.outline.circle.node.contains).toHaveBeenCalledTimes(1);

      expect(b.outline.circle.node.contains.mock.calls[0][0]).toBe(mouseDown.target);
      expect(mouseDown.target).toBeTruthy();
    });

    it('returns true if the base outline circle element contains the mouse down target', () => {
      b.text.node.contains = () => false;

      b.outline.circle.node.contains = () => true;

      mouseDown.target = document.createElement('div');

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(true);
    });

    it('returns false if neither the text of the base nor the base outline contain the mouse down target', () => {
      b.text.node.contains = () => false;

      b.outline.circle.node.contains = () => false;

      mouseDown.target = document.createElement('div');

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(false);
    });

    test('base has no outline', () => {
      b.text.node.contains = () => false;

      b.outline = undefined;

      mouseDown.target = document.createElement('div');

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(false);
    });

    test('base outline has no circle element', () => {
      b.text.node.contains = () => false;

      b.outline = {
        circle: undefined,
      };

      mouseDown.target = document.createElement('div');

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(false);
    });
  });
});
