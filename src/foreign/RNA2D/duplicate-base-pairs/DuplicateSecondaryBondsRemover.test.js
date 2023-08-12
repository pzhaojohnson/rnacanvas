import { DuplicateSecondaryBondsRemover } from './DuplicateSecondaryBondsRemover';

let duplicateSecondaryBondFinder = null;

let secondaryBondRemover = null;

let duplicateSecondaryBondsRemover = null;

beforeEach(() => {
  duplicateSecondaryBondFinder = {
    findOne: () => undefined,
  };

  secondaryBondRemover = {
    remove: () => {},
  };

  duplicateSecondaryBondsRemover = new DuplicateSecondaryBondsRemover({
    duplicateSecondaryBondFinder,
    secondaryBondRemover,
  });
});

afterEach(() => {
  duplicateSecondaryBondsRemover = null;

  secondaryBondRemover = null;

  duplicateSecondaryBondFinder = null;
});

describe('DuplicateSecondaryBondsRemover class', () => {
  describe('remove method', () => {
    test('zero duplicate secondary bonds to remove', () => {
      duplicateSecondaryBondFinder.findOne = jest.fn(() => undefined);
      secondaryBondRemover.remove = jest.fn();

      duplicateSecondaryBondsRemover.remove();

      expect(duplicateSecondaryBondFinder.findOne).toHaveBeenCalledTimes(1);
      expect(secondaryBondRemover.remove).not.toHaveBeenCalled();
    });

    test('one duplicate secondary bond to remove', () => {
      let i = 0;

      duplicateSecondaryBondFinder.findOne = () => {
        let retVal = i < 1 ? 'Secondary bond - 192418udwf' : undefined;
        i += 1;
        return retVal;
      };

      secondaryBondRemover.remove = jest.fn();

      duplicateSecondaryBondsRemover.remove();

      expect(secondaryBondRemover.remove).toHaveBeenCalledTimes(1);

      let call = secondaryBondRemover.remove.mock.calls[0];
      expect(call[0]).toBe('Secondary bond - 192418udwf');
    });

    test('four duplicate secondary bonds to remove', () => {
      let i = 0;

      duplicateSecondaryBondFinder.findOne = () => {
        let retVal = i < 4 ? 'Secondary bond - ' + i : undefined;
        i += 1;
        return retVal;
      };

      secondaryBondRemover.remove = jest.fn();

      duplicateSecondaryBondsRemover.remove();

      expect(secondaryBondRemover.remove).toHaveBeenCalledTimes(4);

      let calls = secondaryBondRemover.remove.mock.calls;
      expect(calls[0][0]).toBe('Secondary bond - 0');
      expect(calls[1][0]).toBe('Secondary bond - 1');
      expect(calls[2][0]).toBe('Secondary bond - 2');
      expect(calls[3][0]).toBe('Secondary bond - 3');
    });
  });
});
