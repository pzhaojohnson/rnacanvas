import { ByTextContentBasesGetter } from './ByTextContentBasesGetter';

let allBasesGetter = null;

let byTextContentFilterer = null;

let byTextContentBasesGetter = null;

beforeEach(() => {
  allBasesGetter = {
    get: () => [],
  };

  byTextContentFilterer = {
    filter: () => [],
  };

  byTextContentBasesGetter = new ByTextContentBasesGetter({
    allBasesGetter, byTextContentFilterer,
  });
});

afterEach(() => {
  byTextContentBasesGetter = null;

  byTextContentFilterer = null;

  allBasesGetter = null;
});

describe('ByTextContentBasesGetter class', () => {
  describe('getWith method', () => {
    it('passes all bases to the filterer', () => {
      allBasesGetter.get = () => (
        ['base7831874', 'base9823598138912', 'base89321276', 'base2371']
      );

      byTextContentFilterer.filter = jest.fn(() => []);

      byTextContentBasesGetter.getWith('A');

      expect(byTextContentFilterer.filter).toHaveBeenCalledTimes(1);
      let call = byTextContentFilterer.filter.mock.calls[0];

      expect(call[0].bases).toStrictEqual(
        ['base7831874', 'base9823598138912', 'base89321276', 'base2371']
      );
    });

    it('passes the specified text content to the filterer', () => {
      byTextContentFilterer.filter = jest.fn(() => []);

      byTextContentBasesGetter.getWith('JD93RHRQN.SDFK9');

      expect(byTextContentFilterer.filter).toHaveBeenCalledTimes(1);
      let call = byTextContentFilterer.filter.mock.calls[0];

      expect(call[0].textContent).toBe('JD93RHRQN.SDFK9');
    });

    it('returns the bases returned by the filterer', () => {
      byTextContentFilterer.filter = () => (
        ['base2178378', 'base4398232789y', 'base123781r3t6', 'base897y237']
      );

      expect(byTextContentBasesGetter.getWith('c')).toStrictEqual(
        ['base2178378', 'base4398232789y', 'base123781r3t6', 'base897y237']
      );
    });
  });
});
