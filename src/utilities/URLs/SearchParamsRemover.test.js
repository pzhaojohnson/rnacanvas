import { SearchParamsRemover } from './SearchParamsRemover';

let searchParamsRemover = null;

beforeEach(() => {
  searchParamsRemover = new SearchParamsRemover();
});

afterEach(() => {
  searchParamsRemover = null;
});

describe('SearchParamsRemover class', () => {
  describe('removeAll method', () => {
    test('some URLs with no search parameters', () => {
      expect(
        searchParamsRemover.removeAll('https://rnacanvas.app')
      ).toBe('https://rnacanvas.app');

      // ends with a forward slash
      expect(
        searchParamsRemover.removeAll('https://rnacanvas.app/')
      ).toBe('https://rnacanvas.app/');
    });

    test('some URLs with one search parameter', () => {
      let url = 'https://rnacanvas.app?rna_2d_schema_url=https://rna.2d.schema.json';

      expect(searchParamsRemover.removeAll(url)).toBe(
        'https://rnacanvas.app'
      );

      // has a forward slash at the end of the domain
      url = 'https://rnacanvas.app/?rna_2d_schema_url=https://rna.2d.schema.json'

      expect(searchParamsRemover.removeAll(url)).toBe(
        'https://rnacanvas.app/'
      );
    });

    test('some URLs with three search parameters', () => {
      let url = 'https://rnacanvas.app?X=3&Y=4&asdf=qwer';

      expect(searchParamsRemover.removeAll(url)).toBe(
        'https://rnacanvas.app'
      );

      // has a forward slash at the end of the domain
      url = 'https://rnacanvas.app/?X=3&Y=4&asdf=qwer';

      expect(searchParamsRemover.removeAll(url)).toBe(
        'https://rnacanvas.app/'
      );
    });
  });
});
