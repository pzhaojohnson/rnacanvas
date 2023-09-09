import { SpannedBasesGetter } from './SpannedBasesGetter';

let allBasesInOrderGetter = null;

let spannedBasesGetter = null;

beforeEach(() => {
  allBasesInOrderGetter = {
    get: () => [],
  };

  spannedBasesGetter = new SpannedBasesGetter({
    allBasesInOrderGetter,
  });
});

afterEach(() => {
  spannedBasesGetter = null;

  allBasesInOrderGetter = null;
});

describe('SpannedBasesGetter class', () => {
  describe('getFor method', () => {
    it('returns an empty array when base 1 is not in the all-bases-in-order array', () => {
      allBasesInOrderGetter.get = () => ['Base 1', 'Base 2', 'Base 4', 'Base 5'];

      let base1 = 'Base 3';
      let base2 = 'Base 4';

      expect(allBasesInOrderGetter.get().includes(base1)).toBeFalsy();
      expect(allBasesInOrderGetter.get().includes(base2)).toBeTruthy();

      expect(spannedBasesGetter.getFor(base1, base2)).toStrictEqual([]);
    });

    it('returns an empty array when base 2 is not in the all-bases-in-order array', () => {
      allBasesInOrderGetter.get = () => ['Base 1', 'Base 3', 'Base 4', 'Base 5'];

      let base1 = 'Base 5';
      let base2 = 'Base 2';

      expect(allBasesInOrderGetter.get().includes(base1)).toBeTruthy();
      expect(allBasesInOrderGetter.get().includes(base2)).toBeFalsy();

      expect(spannedBasesGetter.getFor(base1, base2)).toStrictEqual([]);
    });

    test('when base 1 comes before base 2 in the all-bases-in-order array', () => {
      allBasesInOrderGetter.get = () => ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'];

      let base1 = 'B4';
      let base2 = 'B10';

      expect(spannedBasesGetter.getFor(base1, base2)).toStrictEqual(['B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10']);
    });

    test('when base 2 comes before base 1 in the all-bases-in-order array', () => {
      allBasesInOrderGetter.get = () => ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'];

      let base1 = 'B9';
      let base2 = 'B6';

      expect(spannedBasesGetter.getFor(base1, base2)).toStrictEqual(['B6', 'B7', 'B8', 'B9']);
    });

    test('when base 1 and 2 are the same base', () => {
      allBasesInOrderGetter.get = () => ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'];

      let base1 = 'B8';
      let base2 = 'B8';

      expect(spannedBasesGetter.getFor(base1, base2)).toStrictEqual(['B8']);
    });
  });
});
