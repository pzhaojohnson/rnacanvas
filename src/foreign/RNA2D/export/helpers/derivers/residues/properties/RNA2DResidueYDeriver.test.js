import { RNA2DResidueYDeriver } from './RNA2DResidueYDeriver';

describe('RNA2DResidueYDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the center Y coordinate of the corresponding RNAcanvas base text element', () => {
      let rna2DResidueYDeriver = new RNA2DResidueYDeriver();

      let correspondingRNAcanvasBase = {
        text: {
          bbox: () => ({ cy: 3718.8319443 }),
        },
      };

      expect(rna2DResidueYDeriver.deriveFrom(correspondingRNAcanvasBase)).toBe(3718.8319443);
    });
  });
});
