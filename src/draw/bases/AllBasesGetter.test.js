import { AllBasesGetter } from './AllBasesGetter';

describe('AllBasesGetter class', () => {
  describe('get method', () => {
    it('returns what the bases method of the drawing returns', () => {
      let drawing = {
        bases: () => ['base - 1984y', 'base - 1984ui3h', 'base - 124', 'base - 89u23'],
      };

      let getter = new AllBasesGetter({ drawing });

      expect(getter.get()).toStrictEqual(
        ['base - 1984y', 'base - 1984ui3h', 'base - 124', 'base - 89u23']
      );
    });
  });
});
