import { Month } from './Month';

describe('Month class', () => {
  describe('constructor', () => {
    it('stores index', () => {
      let m = new Month({ index: 9 });
      expect(m.index).toBe(9);

      m = new Month({ index: 5 });
      expect(m.index).toBe(5);
    });
  });

  describe('fullName getter', () => {
    test('some specific months', () => {
      let m = new Month({ index: 3 });
      expect(m.fullName).toBe('April');

      m = new Month({ index: 11 });
      expect(m.fullName).toBe('December');

      m = new Month({ index: 8 });
      expect(m.fullName).toBe('September');
    });

    test('smoke test all valid month indices', () => {
      for (let i = 0; i <= 11; i++) {
        let m = new Month({ index: i });
        expect(typeof m.fullName).toBe('string');
      }
    });

    test('some invalid month indices', () => {
      [12, -1, 5.1495, 100, -20, Infinity, NaN].forEach(i => {
        let m = new Month({ index: i });
        expect(m.fullName).toBeUndefined();
      });
    });
  });
});
