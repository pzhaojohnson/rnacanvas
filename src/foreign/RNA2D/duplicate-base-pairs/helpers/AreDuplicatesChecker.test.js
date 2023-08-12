import { AreDuplicatesChecker } from './AreDuplicatesChecker';

function createSecondaryBondMock() {
  return {
    base1: 'Base - 19843uhie',
    base2: 'Base - 38942ruieh',
    binds: () => false,
  };
}

let checker = null;

beforeEach(() => {
  checker = new AreDuplicatesChecker();
});

afterEach(() => {
  checker = null;
});

describe('AreDuplicatesChecker class', () => {
  describe('check method', () => {
    test('two duplicate secondary bonds', () => {
      let sb1 = createSecondaryBondMock();
      let sb2 = createSecondaryBondMock();

      sb1.binds = () => true;
      sb2.binds = () => true;

      expect(checker.check(sb1, sb2)).toBe(true);
    });

    test('secondary bond 2 does not bind base 1 of secondary bond 1', () => {
      let sb1 = createSecondaryBondMock();
      sb1.base1 = 'Base - 947';
      sb1.base2 = 'Base - 552';
      sb1.binds = () => true;

      let sb2 = createSecondaryBondMock();
      sb2.binds = b => b != 'Base - 947';

      expect(checker.check(sb1, sb2)).toBe(false);
    });

    test('secondary bond 2 does not bind base 2 of secondary bond 1', () => {
      let sb1 = createSecondaryBondMock();
      sb1.base1 = 'Base - 58';
      sb1.base2 = 'Base - 124';
      sb1.binds = () => true;

      let sb2 = createSecondaryBondMock();
      sb2.binds = b => b != 'Base - 124';

      expect(checker.check(sb1, sb2)).toBe(false);
    });

    test('inputting the same secondary bond object twice', () => {
      let sb = createSecondaryBondMock();
      sb.base1 = 'Base - 1',
      sb.base2 = 'Base - 2',
      sb.binds = () => true;

      expect(checker.check(sb, sb)).toBe(false);
    });
  });
});
