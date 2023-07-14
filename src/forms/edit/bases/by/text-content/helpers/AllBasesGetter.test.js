import { AllBasesGetter } from './AllBasesGetter';

let drawing = null;

let allBasesGetter = null;

beforeEach(() => {
  drawing = {
    bases: () => [],
  };

  allBasesGetter = new AllBasesGetter({ drawing });
});

afterEach(() => {
  allBasesGetter = null;

  drawing = null;
});

describe('AllBasesGetter class', () => {
  describe('get method', () => {
    it('returns the bases returned by the drawing bases method', () => {
      drawing.bases = () => (
        ['base31781', 'base7837612', 'base831871746', 'base281241']
      );

      expect(allBasesGetter.get()).toStrictEqual(
        ['base31781', 'base7837612', 'base831871746', 'base281241']
      );
    });
  });
});
