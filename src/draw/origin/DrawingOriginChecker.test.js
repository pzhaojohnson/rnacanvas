import { DrawingOriginChecker } from './DrawingOriginChecker';

let originChecker = null;

let drawing = null;

beforeEach(() => {
  originChecker = new DrawingOriginChecker();

  drawing = {
    origin: undefined,
  };
});

afterEach(() => {
  drawing = null;

  originChecker = null;
});

describe('DrawingOriginChecker class', () => {
  describe('originIsAnRNA2DSchema method', () => {
    it('returns true when origin is "rna-2d-schema"', () => {
      drawing.origin = 'rna-2d-schema';
      expect(originChecker.originIsAnRNA2DSchema(drawing)).toBe(true);
    });

    it('returns false otherwise', () => {
      drawing.origin = undefined;
      expect(originChecker.originIsAnRNA2DSchema(drawing)).toBe(false);

      drawing.origin = 'Something else';
      expect(originChecker.originIsAnRNA2DSchema(drawing)).toBe(false);
    });
  });
});
