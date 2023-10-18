import { PathEndPointDeriver } from './PathEndPointDeriver';

describe('PathEndPointDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the point at the total length of the path', () => {
      let pathEndPointDeriver = new PathEndPointDeriver();

      let path = {
        node: {
          getTotalLength: () => 6381.378149122,
          getPointAtLength: jest.fn(() => ({ x: -3718.351, y: 472.1219 })),
        },
      };

      expect(pathEndPointDeriver.deriveFrom(path)).toStrictEqual({ x: -3718.351, y: 472.1219 });

      // got the point at the total length
      expect(path.node.getPointAtLength.mock.calls[0][0]).toBe(6381.378149122);
    });
  });
});
