import { RNA2DResidueXDeriver } from './RNA2DResidueXDeriver';

describe('RNA2DResidueXDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the center X coordinate of the corresponding RNAcanvas base text element', () => {
      let rna2DResidueXDeriver = new RNA2DResidueXDeriver();

      let b = {
        text: {
          bbox: () => ({ cx: 83.13893526 }),
        },
      };

      expect(rna2DResidueXDeriver.deriveFrom(b)).toBe(83.13893526);
    });
  });
});
