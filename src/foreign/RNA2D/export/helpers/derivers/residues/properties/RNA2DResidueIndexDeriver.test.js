import { RNA2DResidueIndexDeriver } from './RNA2DResidueIndexDeriver';

describe('RNA2DResidueIndexDeriver class', () => {
  describe('deriveFrom method', () => {
    test('an index of zero', () => {
      let orderingGetter = {
        get: () => ['Base Q', 'Base M', 'Base P'],
      };

      let rna2DResidueIndexDeriver = new RNA2DResidueIndexDeriver({ orderingGetter });

      expect(rna2DResidueIndexDeriver.deriveFrom('Base Q')).toBe(0);
    });

    test('index is the last index', () => {
      let orderingGetter = {
        get: () => ['Base Q', 'Base M', 'Base P', 'Base W'],
      };

      let rna2DResidueIndexDeriver = new RNA2DResidueIndexDeriver({ orderingGetter });

      expect(rna2DResidueIndexDeriver.deriveFrom('Base W')).toBe(3);
    });

    test('an index in the middle', () => {
      let orderingGetter = {
        get: () => ['Base Q', 'Base M', 'Base P', 'Base R', 'Base A', 'Base T'],
      };

      let rna2DResidueIndexDeriver = new RNA2DResidueIndexDeriver({ orderingGetter });

      expect(rna2DResidueIndexDeriver.deriveFrom('Base P')).toBe(2);
    });

    test('a missing index', () => {
      let orderingGetter = {
        get: () => ['Base Q', 'Base M', 'Base P'],
      };

      let rna2DResidueIndexDeriver = new RNA2DResidueIndexDeriver({ orderingGetter });

      expect(rna2DResidueIndexDeriver.deriveFrom('Base X')).toBe(-1);
    });
  });
});
