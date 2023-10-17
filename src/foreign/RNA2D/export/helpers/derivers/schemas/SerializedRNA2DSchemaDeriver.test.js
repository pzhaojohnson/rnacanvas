import { SerializedRNA2DSchemaDeriver } from './SerializedRNA2DSchemaDeriver';

let rna2DSchemaDeriver = null;

let jsonStringifier = null;

let serializedRNA2DSchemaDeriver = null;

beforeEach(() => {
  rna2DSchemaDeriver = {
    derive: () => 'An RNA 2D schema',
  };

  jsonStringifier = {
    stringify: () => '',
  };

  serializedRNA2DSchemaDeriver = new SerializedRNA2DSchemaDeriver({
    rna2DSchemaDeriver, jsonStringifier,
  });
});

afterEach(() => {
  serializedRNA2DSchemaDeriver = null;

  jsonStringifier = null;

  rna2DSchemaDeriver = null;
});

describe('SerializedRNA2DSchemaDeriver class', () => {
  describe('derive method', () => {
    it('passes the derived RNA 2D schema to the JSON stringifier', () => {
      rna2DSchemaDeriver.derive = () => 'RNA 2D schema - 9823rufijoasljfd';

      jsonStringifier.stringify = jest.fn(() => '');

      serializedRNA2DSchemaDeriver.derive();

      expect(jsonStringifier.stringify).toHaveBeenCalledTimes(1);
      expect(jsonStringifier.stringify.mock.calls[0][0]).toBe('RNA 2D schema - 9823rufijoasljfd');
    });

    it('returns the serialized RNA 2D schema returned by the JSON stringifier', () => {
      jsonStringifier.stringify = () => 'Serialized RNA 2D schema - 38914y2hiqedk';

      expect(serializedRNA2DSchemaDeriver.derive()).toBe('Serialized RNA 2D schema - 38914y2hiqedk');
    });
  });
});
