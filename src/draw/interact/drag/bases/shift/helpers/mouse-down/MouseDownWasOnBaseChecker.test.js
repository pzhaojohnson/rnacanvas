import { MouseDownWasOnBaseChecker } from './MouseDownWasOnBaseChecker';

function createBaseMock() {
  return {
    text: {
      node: 'Text element DOM node',
    },
  };
}

function createMouseDownMock() {
  return {
    target: 'An event target',
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
    it('returns true if the mouse down target is the text of the base', () => {
      b.text.node = 'Text element DOM node - 1983riuewahfkds';
      mouseDown.target = 'Text element DOM node - 1983riuewahfkds';
      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(true);
    });

    it('returns true if the mouse down target is the circle element of the base outline', () => {
      b.outline = {
        circle: {
          node: 'Circle element DOM node - 298yriwaehuf',
        },
      };

      mouseDown.target = 'Circle element DOM node - 298yriwaehuf';

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(true);
    });

    it('returns false if the mouse down target is not part of the base', () => {
      b.text.node = 'A text element DOM node';

      b.outline = {
        circle: {
          node: 'A circle element DOM node',
        },
      };

      mouseDown.target = 'Something else';

      expect(mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })).toBe(false);
    });

    test('base has no outline', () => {
      b.outline = undefined;

      expect(
        () => mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })
      ).not.toThrow();
    });

    test('base outline has no circle element', () => {
      b.outline = {
        circle: undefined,
      };

      expect(
        () => mouseDownWasOnBaseChecker.checkFor({ base: b, mouseDown })
      ).not.toThrow();
    });
  });
});
