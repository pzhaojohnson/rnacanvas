import { RNA2DSchemaDeriver } from './RNA2DSchemaDeriver';

let allRNA2DRNAMoleculesDeriver = null;

let rna2DSchemaDeriver = null;

beforeEach(() => {
  allRNA2DRNAMoleculesDeriver = {
    derive: () => [],
  };

  rna2DSchemaDeriver = new RNA2DSchemaDeriver({
    allRNA2DRNAMoleculesDeriver,
  });
});

afterEach(() => {
  rna2DSchemaDeriver = null;

  allRNA2DRNAMoleculesDeriver = null;
});

describe('RNA2DSchemaDeriver class', () => {
  describe('derive method', () => {
    it('places all derived RNA 2D RNA molecules in a single RNA 2D RNA complex', () => {
      allRNA2DRNAMoleculesDeriver.derive = () => [
        'RNA 2D RNA molecule - djs98fu9283r',
        'RNA 2D RNA molecule - CJX89XU984',
        'RNA 2D RNA molecule - 2H1IR2893UF9',
        'RNA 2D RNA molecule - 87y7f4fue',
      ];

      let rna2DSchema = rna2DSchemaDeriver.derive();

      expect(rna2DSchema.rnaComplexes.length).toBe(1);

      expect(rna2DSchema.rnaComplexes[0].rnaMolecules).toStrictEqual([
        'RNA 2D RNA molecule - djs98fu9283r',
        'RNA 2D RNA molecule - CJX89XU984',
        'RNA 2D RNA molecule - 2H1IR2893UF9',
        'RNA 2D RNA molecule - 87y7f4fue',
      ]);
    });
  });
});
