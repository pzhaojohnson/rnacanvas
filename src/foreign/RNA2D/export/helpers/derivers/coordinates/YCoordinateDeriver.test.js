import { YCoordinateDeriver } from './YCoordinateDeriver';

describe('YCoordinateDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the Y coordinate of the point derived by the helper point deriver', () => {
      let pointDeriver = {
        deriveFrom: jest.fn(() => ({ y: 26174.2387469 })),
      };

      let yCoordinateDeriver = new YCoordinateDeriver(pointDeriver);

      expect(yCoordinateDeriver.deriveFrom('329898riwakjfal')).toBe(26174.2387469);

      // passed the thing to the helper point deriver
      expect(pointDeriver.deriveFrom.mock.calls[0][0]).toBe('329898riwakjfal');
    });
  });
});
