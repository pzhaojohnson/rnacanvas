import { ReappendNodeToItsParent } from './ReappendNodetoItsParent';

let targetNode = null;

let reappendNodeToItsParent = null;

beforeEach(() => {
  targetNode = { parentNode: null };

  reappendNodeToItsParent = new ReappendNodeToItsParent(targetNode);
});

afterEach(() => {
  reappendNodeToItsParent = null;

  targetNode = null;
});

describe('ReappendNodeToItsParent class', () => {
  describe('do method', () => {
    test('target node has a parent node', () => {
      targetNode.parentNode = { appendChild: jest.fn() };

      reappendNodeToItsParent.do();

      expect(targetNode.parentNode.appendChild).toHaveBeenCalledTimes(1);
      expect(targetNode.parentNode.appendChild.mock.calls[0][0]).toBe(targetNode);
    });

    test('parent node is null', () => {
      targetNode.parentNode = null;

      expect(() => reappendNodeToItsParent.do()).not.toThrow();
    });

    test('parent node is undefined', () => {
      targetNode.parentNode = undefined;

      expect(() => reappendNodeToItsParent.do()).not.toThrow();
    });
  });
});
