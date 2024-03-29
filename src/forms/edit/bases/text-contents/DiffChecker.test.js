import { DiffChecker } from './DiffChecker';

let textContentsGetter = null;

let diffChecker = null;

beforeEach(() => {
  textContentsGetter = {
    get: () => [],
  };

  diffChecker = new DiffChecker({ textContentsGetter });
});

afterEach(() => {
  diffChecker = null;

  textContentsGetter = null;
});

describe('DiffChecker class', () => {
  describe('checkFor method', () => {
    test('for zero text contents', () => {
      textContentsGetter.get = () => [];

      expect(diffChecker.checkFor('A')).toBe(false);
    });

    test('for one text content that does differ', () => {
      textContentsGetter.get = () => ['u'];

      expect(diffChecker.checkFor('U')).toBe(true);
    });

    test('for one text content that does not differ', () => {
      textContentsGetter.get = () => ['asDFzxcv'];

      expect(diffChecker.checkFor('asDFzxcv')).toBe(false);
    });

    test('for four text contents that do not differ', () => {
      textContentsGetter.get = () => ['tU', 'tU', 'tU', 'tU'];

      expect(diffChecker.checkFor('tU')).toBe(false);
    });

    test('for four text contents of which only one differs', () => {
      textContentsGetter.get = () => ['aaa', 'aaa', 'ata', 'aaa'];

      expect(diffChecker.checkFor('aaa')).toBe(true);
    });

    test('for three text contents that all differ', () => {
      textContentsGetter.get = () => ['k', 'n', 'N'];

      expect(diffChecker.checkFor('m')).toBe(true);
    });
  });
});
