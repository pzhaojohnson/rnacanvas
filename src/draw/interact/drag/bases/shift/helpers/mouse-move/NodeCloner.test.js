import { NodeCloner } from './NodeCloner';

let nodeCloner = null;

beforeEach(() => {
  nodeCloner = new NodeCloner();
});

afterEach(() => {
  nodeCloner = null;
});

describe('NodeCloner class', () => {
  describe('deepClone method', () => {
    it('calls .cloneNode(true) on the node and returns the result', () => {
      let node = {
        cloneNode: jest.fn(() => 'A node - 2398u8qruiahfsd'),
      };

      let deepClone = nodeCloner.deepClone(node);

      expect(node.cloneNode).toHaveBeenCalledTimes(1);
      expect(node.cloneNode.mock.calls[0][0]).toBe(true);

      expect(deepClone).toBe('A node - 2398u8qruiahfsd');
    });
  });
});
