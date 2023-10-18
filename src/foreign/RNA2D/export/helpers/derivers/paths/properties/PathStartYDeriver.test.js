import { PathStartYDeriver } from './PathStartYDeriver';

describe('PathStartYDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the Y coordinate of the point at zero length along the path', () => {
      let pathStartYDeriver = new PathStartYDeriver();

      let path = {
        node: {
          getPointAtLength: jest.fn(() => ({ y: 9847.1267415 })),
        },
      };

      expect(pathStartYDeriver.deriveFrom(path)).toBe(9847.1267415);

      // got the point at length zero
      expect(path.node.getPointAtLength.mock.calls[0][0]).toBe(0);
    });
  });
});
