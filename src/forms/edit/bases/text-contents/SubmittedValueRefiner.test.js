import { SubmittedValueRefiner } from './SubmittedValueRefiner';

let refiner = null;

beforeEach(() => {
  refiner = new SubmittedValueRefiner();
});

afterEach(() => {
  refiner = null;
});

describe('SubmittedValueRefiner class', () => {
  describe('refine method', () => {
    test('an empty string', () => {
      expect(refiner.refine('')).toBe('');
    });

    test('strings that are all whitespace', () => {
      expect(refiner.refine(' ')).toBe('');
      expect(refiner.refine('\t\n  \n\t ')).toBe('');
      expect(refiner.refine('  \t\n ')).toBe('');
    });

    test('strings with no whitespace', () => {
      expect(refiner.refine('A')).toBe('A');
      expect(refiner.refine('uT')).toBe('uT');
      expect(refiner.refine('28938h')).toBe('28938h');
    });

    test('strings with leading and trailing whitespace', () => {
      expect(refiner.refine('    A')).toBe('A');
      expect(refiner.refine('r    ')).toBe('r');
      expect(refiner.refine('   uTn  \t   ')).toBe('uTn');
    });
  });
});
