import { ResidueIndex2Deriver } from './ResidueIndex2Deriver';

describe('ResidueIndex2Deriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the index derived by the general residue index deriver', () => {
      let aGeneralResidueIndexDeriver = {
        deriveFrom: jest.fn(() => 8391479427),
      };

      let residueIndex2Deriver = new ResidueIndex2Deriver(aGeneralResidueIndexDeriver);

      let rnaCanvasSecondaryBond = { base2: 'Base - 389749216473' };

      expect(residueIndex2Deriver.deriveFrom(rnaCanvasSecondaryBond)).toBe(8391479427);

      // passed in base 2 of the RNAcanvas secondary bond
      expect(aGeneralResidueIndexDeriver.deriveFrom.mock.calls[0][0]).toBe('Base - 389749216473');
    });
  });
});
