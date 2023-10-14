import { PredeterminedValueDeriver } from './PredeterminedValueDeriver';

describe('PredeterminedValueDeriver class', () => {
  describe('deriveFrom method', () => {
    it('simply returns the predetermined value', () => {
      let predeterminedValueDeriver = new PredeterminedValueDeriver('kdja89fu283fialsdf');

      expect(predeterminedValueDeriver.deriveFrom('asdf')).toBe('kdja89fu283fialsdf');
    });
  });
});
