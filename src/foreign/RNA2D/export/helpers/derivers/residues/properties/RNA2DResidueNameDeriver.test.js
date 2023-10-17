import { RNA2DResidueNameDeriver } from './RNA2DResidueNameDeriver';

describe('RNA2DResidueNameDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the text content of the corresponding RNAcanvas base text element', () => {
      let rna2DResidueNameDeriver = new RNA2DResidueNameDeriver();

      let correspondingRNAcanvasBase = {
        text: {
          text: () => 'asdhf982938fiojd',
        },
      };

      expect(rna2DResidueNameDeriver.deriveFrom(correspondingRNAcanvasBase)).toBe('asdhf982938fiojd');
    });
  });
});
