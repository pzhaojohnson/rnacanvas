import { ByTextContentFilterer } from './ByTextContentFilterer';

let textContentGetter = null;

let byTextContentFilterer = null;

beforeEach(() => {
  textContentGetter = {
    getFor: () => '',
  };

  byTextContentFilterer = new ByTextContentFilterer({
    textContentGetter,
  });
});

afterEach(() => {
  byTextContentFilterer = null;

  textContentGetter = null;
});

describe('ByTextContentFilterer class', () => {
  describe('filter method', () => {
    it('passes each base to the text content getter', () => {
      let bases = ['base1', 'base2', 'base3', 'base4'];
      let textContent = 'A';

      textContentGetter.getFor = jest.fn(() => '');

      let filtered = byTextContentFilterer.filter({ bases, textContent });

      expect(textContentGetter.getFor).toHaveBeenCalledTimes(4);

      let args = textContentGetter.getFor.mock.calls.map(c => c[0]);
      expect(args.includes('base1')).toBeTruthy();
      expect(args.includes('base2')).toBeTruthy();
      expect(args.includes('base3')).toBeTruthy();
      expect(args.includes('base4')).toBeTruthy();
    });

    it('only returns bases with the specified text content', () => {
      let bases = ['base1', 'base2', 'base3', 'base4', 'base5'];
      let textContent = 'Nn';

      textContentGetter.getFor = b => ({
        'base1': 'Mm',
        'base2': 'Nn',
        'base3': 'n',
        'base4': 'nN',
        'base5': 'Nn',
      }[b]);

      let filtered = byTextContentFilterer.filter({ bases, textContent });

      expect(filtered).toStrictEqual(['base2', 'base5']);
    });

    it('returns a new array', () => {
      let bases = ['base1', 'base2'];
      let textContent = 'G';

      textContentGetter.getFor = () => 'G';

      let filtered = byTextContentFilterer.filter({ bases, textContent });

      expect(filtered).toStrictEqual(bases);

      // are not the same array
      expect(filtered).not.toBe(bases);
    });

    it('does not modify the passed bases array', () => {
      let bases = ['base1', 'base2', 'base3'];
      let textContent = 'n';

      textContentGetter.getFor = () => 'n';

      let filtered = byTextContentFilterer.filter({ bases, textContent });

      expect(filtered).toStrictEqual(['base1', 'base2', 'base3']);

      // does not remove any bases
      expect(bases).toStrictEqual(['base1', 'base2', 'base3']);
    });

    test('an empty bases array', () => {
      let bases = [];
      let textContent = 'A';

      let filtered = byTextContentFilterer.filter({ bases, textContent });

      expect(filtered).toStrictEqual([]);
    });
  });
});
