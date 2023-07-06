import { SavedOriginExtractor } from './SavedOriginExtractor';

let extractor = null;

beforeEach(() => {
  extractor = new SavedOriginExtractor();
});

afterEach(() => {
  extractor = null;
});

describe('SavedOriginExtractor class', () => {
  describe('extract method', () => {
    it('returns saved string origins', () => {
      let savedDrawing = { origin: 'rna-2d-schema' };
      expect(extractor.extract(savedDrawing)).toBe('rna-2d-schema');

      savedDrawing = { origin: 'Another origin' };
      expect(extractor.extract(savedDrawing)).toBe('Another origin');
    });

    it('returns undefined when the saved origin is not a string', () => {
      let savedDrawing = { origin: 2 };
      expect(extractor.extract(savedDrawing)).toBeUndefined();

      savedDrawing = { origin: true };
      expect(extractor.extract(savedDrawing)).toBeUndefined();

      savedDrawing = { origin: {} };
      expect(extractor.extract(savedDrawing)).toBeUndefined();

      savedDrawing = { origin: null };
      expect(extractor.extract(savedDrawing)).toBeUndefined();
    });

    it('returns undefined when there is no saved origin', () => {
      let savedDrawing = {};
      expect(extractor.extract(savedDrawing)).toBeUndefined();

      savedDrawing = { origin: undefined };
      expect(extractor.extract(savedDrawing)).toBeUndefined();
    });

    it('returns undefined for non-object inputs', () => {
      expect(extractor.extract(undefined)).toBeUndefined();
      expect(extractor.extract(null)).toBeUndefined();
      expect(extractor.extract(57)).toBeUndefined();
      expect(extractor.extract(false)).toBeUndefined();
      expect(extractor.extract('asdf')).toBeUndefined();
      expect(extractor.extract('')).toBeUndefined();
    });
  });
});
