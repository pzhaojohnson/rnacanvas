import { PropertyDeriver } from './PropertyDeriver';

let valueDeriver = null;

let propertyDeriver = null;

beforeEach(() => {
  valueDeriver = {
    deriveFrom: () => undefined,
  };

  propertyDeriver = new PropertyDeriver({
    propertyName: '',
    valueDeriver,
  });
});

afterEach(() => {
  propertyDeriver = null;

  valueDeriver = null;
});

describe('PropertyDeriver class', () => {
  describe('deriveFrom method', () => {
    it('uses the property name specified at construction', () => {
      let propertyDeriver = new PropertyDeriver({
        propertyName: '98asufih2kjfweasd',
        valueDeriver,
      });

      expect(propertyDeriver.deriveFrom('asdf').name).toBe('98asufih2kjfweasd');
    });

    it('passes the value-to-derive-from to the helper value deriver', () => {
      valueDeriver.deriveFrom = jest.fn(() => undefined);

      propertyDeriver.deriveFrom('asodfjoijflwekasdmxl');

      expect(valueDeriver.deriveFrom).toHaveBeenCalledTimes(1);
      expect(valueDeriver.deriveFrom.mock.calls[0][0]).toBe('asodfjoijflwekasdmxl');
    });

    it('includes the value derived by the helper value deriver', () => {
      valueDeriver.deriveFrom = () => 'zxcnvoiwj981u83r2oi';

      expect(propertyDeriver.deriveFrom('asdf').value).toBe('zxcnvoiwj981u83r2oi');
    });
  });
});
