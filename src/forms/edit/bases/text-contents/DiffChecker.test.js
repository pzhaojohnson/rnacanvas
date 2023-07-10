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
  describe('someTextContentsDifferFrom method', () => {
    test('for zero text contents', () => {
      textContentsGetter.get = () => [];

      expect(diffChecker.someTextContentsDifferFrom('A')).toBe(false);
    });

    test('for one text content that does differ', () => {
      textContentsGetter.get = () => ['u'];

      expect(diffChecker.someTextContentsDifferFrom('U')).toBe(true);
    });

    test('for one text content that does not differ', () => {
      textContentsGetter.get = () => ['asDFzxcv'];

      expect(diffChecker.someTextContentsDifferFrom('asDFzxcv')).toBe(false);
    });

    test('for four text contents that do not differ', () => {
      textContentsGetter.get = () => ['tU', 'tU', 'tU', 'tU'];

      expect(diffChecker.someTextContentsDifferFrom('tU')).toBe(false);
    });

    test('for four text contents of which only one differs', () => {
      textContentsGetter.get = () => ['aaa', 'aaa', 'ata', 'aaa'];

      expect(diffChecker.someTextContentsDifferFrom('aaa')).toBe(true);
    });

    test('for three text contents that all differ', () => {
      textContentsGetter.get = () => ['k', 'n', 'N'];

      expect(diffChecker.someTextContentsDifferFrom('m')).toBe(true);
    });
  });
});
