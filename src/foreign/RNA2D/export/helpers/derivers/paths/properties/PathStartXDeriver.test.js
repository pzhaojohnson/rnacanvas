import { PathStartXDeriver } from './PathStartXDeriver';

describe('PathStartXDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the X coordinate of the point at length zero along the path', () => {
      let pathStartXDeriver = new PathStartXDeriver();

      let path = {
        node: {
          getPointAtLength: jest.fn(() => ({ x: 4718.318418 })),
        },
      };

      expect(pathStartXDeriver.deriveFrom(path)).toBe(4718.318418);

      // got the point at length zero
      expect(path.node.getPointAtLength.mock.calls[0][0]).toBe(0);
    });
  });
});
