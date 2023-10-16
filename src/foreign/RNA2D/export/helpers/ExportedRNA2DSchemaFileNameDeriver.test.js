import { ExportedRNA2DSchemaFileNameDeriver } from './ExportedRNA2DSchemaFileNameDeriver';

let theDocumentForTheWholeApp = null;

let exportedRNA2DSchemaFileNameDeriver = null;

beforeEach(() => {
  theDocumentForTheWholeApp = {
    title: '',
  };

  exportedRNA2DSchemaFileNameDeriver = new ExportedRNA2DSchemaFileNameDeriver({
    theDocumentForTheWholeApp,
  });
});

afterEach(() => {
  exportedRNA2DSchemaFileNameDeriver = null;

  theDocumentForTheWholeApp = null;
});

describe('ExportedRNA2DSchemaFileNameDeriver class', () => {
  describe('derive method', () => {
    test('app document title is truthy', () => {
      theDocumentForTheWholeApp.title = 'KD98do24tDji';

      expect(exportedRNA2DSchemaFileNameDeriver.derive()).toBe('KD98do24tDji.json');
    });

    test('app document title is falsy', () => {
      theDocumentForTheWholeApp.title = '';

      expect(exportedRNA2DSchemaFileNameDeriver.derive()).toBe('molecule.json');
    });
  });
});
