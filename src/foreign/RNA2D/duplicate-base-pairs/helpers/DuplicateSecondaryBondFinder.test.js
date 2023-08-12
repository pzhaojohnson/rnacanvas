import { DuplicateSecondaryBondFinder } from './DuplicateSecondaryBondFinder';

let allSecondaryBondsProvider = null;

let areDuplicatesChecker = null;

let duplicateSecondaryBondFinder = null;

beforeEach(() => {
  allSecondaryBondsProvider = {
    provide: () => [],
  };

  areDuplicatesChecker = {
    check: () => false,
  };

  duplicateSecondaryBondFinder = new DuplicateSecondaryBondFinder({
    allSecondaryBondsProvider,
    areDuplicatesChecker,
  });
});

afterEach(() => {
  duplicateSecondaryBondFinder = null;

  areDuplicatesChecker = null;

  allSecondaryBondsProvider = null;
});

describe('DuplicateSecondaryBondFinder class', () => {
  describe('findOne method', () => {
    test('there are no secondary bonds to begin with', () => {
      allSecondaryBondsProvider.provide = () => [];

      areDuplicatesChecker.check = () => true;

      expect(duplicateSecondaryBondFinder.findOne()).toBeUndefined();
    });

    test('there are no duplicate secondary bonds', () => {
      allSecondaryBondsProvider.provide = () => [
        'SB - 3823', 'SB - 1839ur', 'SB - 398yr2', 'SB - 389u2riheqw',
      ];

      areDuplicatesChecker.check = () => false;

      expect(duplicateSecondaryBondFinder.findOne()).toBeUndefined();
    });

    test('there is one duplicate secondary bonds pair', () => {
      allSecondaryBondsProvider.provide = () => [
        'SB - 1', 'SB - 2', 'SB - 3', 'SB - 4', 'SB - 5', 'SB - 6', 'SB - 7',
      ];

      areDuplicatesChecker.check = (sb1, sb2) => sb1 == 'SB - 2' && sb2 == 'SB - 6';

      let duplicate = duplicateSecondaryBondFinder.findOne();
      expect(['SB - 2', 'SB - 6'].includes(duplicate)).toBeTruthy();
    });

    test('there are three duplicate secondary bond pairs', () => {
      allSecondaryBondsProvider.provide = () => [
        'SBa', 'SBb', 'SBc', 'SBd', 'SBe', 'SBf', 'SBg', 'SBh', 'SBi', 'SBj', 'SBk', 'SBl', 'SBm', 'SBn',
      ];

      areDuplicatesChecker.check = (sb1, sb2) => (
        (sb1 == 'SBd' && sb2 == 'SBj')
        || (sb1 == 'SBk' && sb2 == 'SBi')
        || (sb1 == 'SBh' && sb2 == 'SBn')
      );

      let duplicate = duplicateSecondaryBondFinder.findOne();
      expect(['SBd', 'SBj', 'SBk', 'SBi', 'SBh', 'SBn'].includes(duplicate)).toBeTruthy();
    });

    /**
     * Important!
     *
     * In case the are-duplicates checker were to mistake a secondary
     * bond as being a duplicate of itself.
     */
    it('will never mistake a secondary bond as being a duplicate of itself', () => {
      allSecondaryBondsProvider.provide = () => [
        'SB1', 'SB2', 'SB3', 'SB4', 'SB5',
      ];

      areDuplicatesChecker.check = jest.fn((sb1, sb2) => {
        expect(sb1).not.toBe(sb2);
        return false;
      });

      duplicateSecondaryBondFinder.findOne();

      // 5 secondary bonds total
      // (5 - 1 = 4 checks per secondary bond)
      expect(areDuplicatesChecker.check).toHaveBeenCalledTimes(20);
    });
  });
});
