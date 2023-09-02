import { SelectedBasesGetter } from './SelectedBasesGetter';

let allBasesGetter = null;

let baseIsSelectedChecker = null;

let selectedBasesGetter = null;

beforeEach(() => {
  allBasesGetter = {
    get: () => [],
  };

  baseIsSelectedChecker = {
    check: () => false,
  };

  selectedBasesGetter = new SelectedBasesGetter({
    allBasesGetter, baseIsSelectedChecker,
  });
});

afterEach(() => {
  selectedBasesGetter = null;

  baseIsSelectedChecker = null;

  allBasesGetter = null;
});

describe('SelectedBasesGetter class', () => {
  describe('get method', () => {
    it('filters all bases using the base-is-selected checker', () => {
      allBasesGetter.get = () => [
        'base 1', 'base 2', 'base 3', 'base 4', 'base 5', 'base 6', 'base 7', 'base 8', 'base 9', 'base 10',
      ];

      baseIsSelectedChecker.check = b => {
        return ['base 2', 'base 5', 'base 6', 'base 8', 'base 10'].includes(b);
      };

      expect(selectedBasesGetter.get()).toStrictEqual(['base 2', 'base 5', 'base 6', 'base 8', 'base 10']);
    });

    test('there are no bases in the drawing', () => {
      allBasesGetter.get = () => [];

      baseIsSelectedChecker.check = () => true;

      expect(selectedBasesGetter.get()).toStrictEqual([]);
    });
  });
});
