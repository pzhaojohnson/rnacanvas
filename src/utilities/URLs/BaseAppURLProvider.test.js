import { BaseAppURLProvider } from './BaseAppURLProvider';

let fullAppURLKnower = null;

let searchParamsRemover = null;

let baseAppURLProvider = null;

beforeEach(() => {
  fullAppURLKnower = {
    URL: '',
  };

  searchParamsRemover = {
    removeAll: jest.fn(() => ''),
  };

  baseAppURLProvider = new BaseAppURLProvider({
    fullAppURLKnower,
    searchParamsRemover,
  });
});

afterEach(() => {
  baseAppURLProvider = null;

  searchParamsRemover = null;

  fullAppURLKnower = null;
});

describe('BaseAppURLProvider class', () => {
  describe('provide method', () => {
    it('passes full app URL to search parameters remover', () => {
      fullAppURLKnower.URL = (
        'https://rnacanvas.app/?rna_2d_schema_url=https://asdf.187122872.json'
      );

      searchParamsRemover.removeAll = jest.fn(() => '');

      baseAppURLProvider.provide();

      expect(searchParamsRemover.removeAll).toHaveBeenCalledTimes(1);

      expect(searchParamsRemover.removeAll.mock.calls[0][0]).toBe(
        'https://rnacanvas.app/?rna_2d_schema_url=https://asdf.187122872.json'
      );
    });

    it('returns the URL produced by the search parameters remover', () => {
      searchParamsRemover.removeAll = () => 'https://rnacanvas.189412941.app';

      expect(baseAppURLProvider.provide()).toBe(
        'https://rnacanvas.189412941.app'
      );
    });
  });
});
