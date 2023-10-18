import { ResidueIndex1Deriver } from './ResidueIndex1Deriver';

describe('ResidueIndex1Deriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the index derived by the general residue index deriver', () => {
      let aGeneralResidueIndexDeriver = {
        deriveFrom: jest.fn(() => 387371824),
      };

      let residueIndex1Deriver = new ResidueIndex1Deriver(aGeneralResidueIndexDeriver);

      let rnaCanvasSecondaryBond = { base1: 'Base - 3264812478' };

      expect(residueIndex1Deriver.deriveFrom(rnaCanvasSecondaryBond)).toBe(387371824);

      // passed in the correct base
      expect(aGeneralResidueIndexDeriver.deriveFrom.mock.calls[0][0]).toBe('Base - 3264812478');
    });
  });
});
