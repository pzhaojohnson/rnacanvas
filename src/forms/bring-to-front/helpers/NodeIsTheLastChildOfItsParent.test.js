import { NodeIsTheLastChildOfItsParent } from './NodeIsTheLastChildOfItsParent';

describe('NodeIsTheLastChildOfItsParent class', () => {
  describe('isTrue method', () => {
    it('returns true when the target node is the last child of its parent', () => {
      let targetNode = {};

      targetNode.parentNode = { lastChild: targetNode };

      expect((new NodeIsTheLastChildOfItsParent({ targetNode })).isTrue()).toBe(true);
    });

    it('returns false when the target node is not the last child of its parent', () => {
      let targetNode = { parentNode: { lastChild: {} } };

      expect((new NodeIsTheLastChildOfItsParent({ targetNode })).isTrue()).toBe(false);
    });

    it('returns false when the target node has no parent', () => {
      let targetNode = { parentNode: null };

      expect((new NodeIsTheLastChildOfItsParent({ targetNode })).isTrue()).toBe(false);
    });
  });
});
