import { PropertyObjectDeriver } from './PropertyObjectDeriver';

let propertyValueDeriver = null;

let propertyObjectDeriver = null;

beforeEach(() => {
  propertyValueDeriver = {
    deriveFrom: () => undefined,
  };

  propertyObjectDeriver = new PropertyObjectDeriver(
    '',
    propertyValueDeriver,
  );
});

afterEach(() => {
  propertyObjectDeriver = null;

  propertyValueDeriver = null;
});

describe('PropertyObjectDeriver class', () => {
  describe('deriveFrom method', () => {
    it('uses the property name specified at construction', () => {
      let propertyObjectDeriver = new PropertyObjectDeriver(
        '98asufih2kjfweasd',
        propertyValueDeriver,
      );

      expect(propertyObjectDeriver.deriveFrom('asdf').name).toBe('98asufih2kjfweasd');
    });

    it('passes the value-to-derive-from to the helper property value deriver', () => {
      propertyValueDeriver.deriveFrom = jest.fn(() => undefined);

      propertyObjectDeriver.deriveFrom('asodfjoijflwekasdmxl');

      expect(propertyValueDeriver.deriveFrom).toHaveBeenCalledTimes(1);
      expect(propertyValueDeriver.deriveFrom.mock.calls[0][0]).toBe('asodfjoijflwekasdmxl');
    });

    it('assigns the value derived by the helper property value deriver to returned property objects', () => {
      propertyValueDeriver.deriveFrom = () => 'zxcnvoiwj981u83r2oi';

      expect(propertyObjectDeriver.deriveFrom('asdf').value).toBe('zxcnvoiwj981u83r2oi');
    });
  });
});
