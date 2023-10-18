import { XCoordinateDeriver } from './XCoordinateDeriver';

describe('XCoordinateDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the X coordinate of the point derived by the helper point deriver', () => {
      let pointDeriver = {
        deriveFrom: jest.fn(() => ({ x: 9339.36142362 })),
      };

      let xCoordinateDeriver = new XCoordinateDeriver(pointDeriver);

      expect(xCoordinateDeriver.deriveFrom('skdf298f2hfiwd')).toBe(9339.36142362);

      // passed the thing to the point deriver
      expect(pointDeriver.deriveFrom.mock.calls[0][0]).toBe('skdf298f2hfiwd');
    });
  });
});
