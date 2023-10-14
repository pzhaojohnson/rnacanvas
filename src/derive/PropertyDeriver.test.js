import { PropertyDeriver } from './PropertyDeriver';

describe('PropertyDeriver class', () => {
  describe('deriveFrom method', () => {
    it('returns the value of the correct property', () => {
      let propertyDeriver = new PropertyDeriver('xmksf98ur93efjd');

      let anObject = {
        'xmksf98ur93efjd': 'cxl293kckxl17y317r83',
      };

      expect(propertyDeriver.deriveFrom(anObject)).toBe('cxl293kckxl17y317r83');
    });
  });
});
