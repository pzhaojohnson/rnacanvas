import { AllSecondaryBondsProvider } from './AllSecondaryBondsProvider';

describe('AllSecondaryBondsProvider class', () => {
  describe('provide method', () => {
    test('a drawing with no secondary bonds', () => {
      let drawing = { secondaryBonds: [] };

      let provider = new AllSecondaryBondsProvider({ drawing });

      expect(provider.provide()).toStrictEqual([]);
    });

    test('a drawing with three secondary bonds', () => {
      let drawing = {
        secondaryBonds: ['sb-1482', 'sb-ai37eiu', 'sb-38r9eu'],
      };

      let provider = new AllSecondaryBondsProvider({ drawing });

      expect(provider.provide()).toStrictEqual(
        ['sb-1482', 'sb-ai37eiu', 'sb-38r9eu']
      );
    });
  });
});
