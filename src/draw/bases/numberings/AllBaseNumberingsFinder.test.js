import { AllBaseNumberingsFinder } from './AllBaseNumberingsFinder';

let allBasesFinder = null;

let allBaseNumberingsFinder = null;

beforeEach(() => {
  allBasesFinder = {
    findIn: () => [],
  };

  allBaseNumberingsFinder = new AllBaseNumberingsFinder({
    allBasesFinder,
  });
});

afterEach(() => {
  allBaseNumberingsFinder = null;

  allBasesFinder = null;
});

describe('AllBaseNumberingsFinder class', () => {
  describe('findIn method', () => {
    it('passes the drawing to the all-bases finder', () => {
      let drawing = 'Drawing - y34qtiuleak';

      allBasesFinder.findIn = jest.fn(() => []);

      allBaseNumberingsFinder.findIn(drawing);

      expect(allBasesFinder.findIn).toHaveBeenCalledTimes(1);
      expect(allBasesFinder.findIn.mock.calls[0][0]).toBe('Drawing - y34qtiuleak');
    });

    test('a drawing with no bases', () => {
      allBasesFinder.findIn = () => [];

      expect(allBaseNumberingsFinder.findIn('Drawing')).toStrictEqual([]);
    });

    test('only some bases have numberings', () => {
      allBasesFinder.findIn = () => [
        { numbering: undefined },
        { numbering: 'Base numbering - 3298ri' },
        { numbering: 'Base numbering - oi239' },
        {},
        { numbering: 'Base numbering - nc9' },
        { numbering: undefined },
        { numbering: 'Base numbering - dsiofu29' },
      ];

      expect(allBaseNumberingsFinder.findIn('Drawing')).toStrictEqual([
        'Base numbering - 3298ri',
        'Base numbering - oi239',
        'Base numbering - nc9',
        'Base numbering - dsiofu29',
      ]);
    });
  });
});
