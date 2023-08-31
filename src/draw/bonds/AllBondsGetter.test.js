import { AllBondsGetter } from './AllBondsGetter';

let drawing = null;

let allBondsGetter = null;

beforeEach(() => {
  drawing = {
    primaryBonds: [],
    secondaryBonds: [],
    tertiaryBonds: [],
  };

  allBondsGetter = new AllBondsGetter({ drawing });
});

afterEach(() => {
  allBondsGetter = null;

  drawing = null;
});

describe('AllBondsGetter class', () => {
  describe('get method', () => {
    test('a drawing with zero primary, secondary and tertiary bonds', () => {
      drawing.primaryBonds = [];
      drawing.secondaryBonds = [];
      drawing.tertiaryBonds = [];

      expect(allBondsGetter.get()).toStrictEqual([]);
    });

    test('a drawing with 3 primary bonds, 2 secondary bonds and 4 tertiary bonds', () => {
      drawing.primaryBonds = ['primary bond - 18413', 'primary bond - 8924u', 'primary bond - 28u93r'];
      drawing.secondaryBonds = ['secondary bond - 09ue', 'secondary bond - eri4'];
      drawing.tertiaryBonds = ['tertiary bond - 2', 'tertiary bond - 8', 'tertiary bond - 9', 'tertiary bond - 1'];

      expect(allBondsGetter.get()).toStrictEqual([
        'primary bond - 18413', 'primary bond - 8924u', 'primary bond - 28u93r',
        'secondary bond - 09ue', 'secondary bond - eri4',
        'tertiary bond - 2', 'tertiary bond - 8', 'tertiary bond - 9', 'tertiary bond - 1',
      ]);
    });
  });
});
