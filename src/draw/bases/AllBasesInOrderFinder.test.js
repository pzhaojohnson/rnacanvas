import { AllBasesInOrderFinder } from './AllBasesInOrderFinder';

let allBasesInOrderFinder = null;

beforeEach(() => {
  allBasesInOrderFinder = new AllBasesInOrderFinder();
});

afterEach(() => {
  allBasesInOrderFinder = null;
});

describe('AllBasesInOrderFinder class', () => {
  describe('findIn method', () => {
    test('a drawing with no sequences', () => {
      let drawing = {
        sequences: [],
      };

      expect(allBasesInOrderFinder.findIn(drawing)).toStrictEqual([]);
    });

    test('a drawing with one sequence', () => {
      let drawing = {
        sequences: [
          { bases: ['Base - 382u', 'Base - 2ur3uf', 'Base - jd89s', 'Base - mcoe'] },
        ],
      };

      expect(allBasesInOrderFinder.findIn(drawing)).toStrictEqual([
        'Base - 382u', 'Base - 2ur3uf', 'Base - jd89s', 'Base - mcoe',
      ]);
    });

    test('a drawing with four sequences', () => {
      let drawing = {
        sequences: [
          { bases: ['Base 8', 'Base 2', 'Base 5'] },
          { bases: ['Base 12'] },
          { bases: ['Base A', 'Base Q', 'Base I', 'Base J', 'Base B'] },
          { bases: ['Base BB', 'Base 48'] },
        ],
      };

      expect(allBasesInOrderFinder.findIn(drawing)).toStrictEqual([
        'Base 8', 'Base 2', 'Base 5',
        'Base 12',
        'Base A', 'Base Q', 'Base I', 'Base J', 'Base B',
        'Base BB', 'Base 48',
      ]);
    });

    test('an empty sequence', () => {
      let drawing = {
        sequences: [
          { bases: ['Base 3', 'Base 28'] },
          { bases: [] },
          { bases: ['Base A', 'Base X', 'Base 50'] },
        ],
      };

      expect(allBasesInOrderFinder.findIn(drawing)).toStrictEqual([
        'Base 3', 'Base 28',
        'Base A', 'Base X', 'Base 50',
      ]);
    });
  });
});
