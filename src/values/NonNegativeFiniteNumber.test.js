import { NonNegativeFiniteNumber } from './NonNegativeFiniteNumber';

describe('NonNegativeFiniteNumber class', () => {
  describe('constructor', () => {
    it('sets the value', () => {
      [0, 1, 0.001246, 56, 272.592].forEach(value => {
        let n = new NonNegativeFiniteNumber(value);
        expect(n.getValue()).toBe(value);
      });
    });

    it('throws for values that are negative', () => {
      [-1, -0.00000127, -87491, -48.115389].forEach(value => {
        expect(
          () => new NonNegativeFiniteNumber(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        expect(
          () => new NonNegativeFiniteNumber(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['Q', false, {}, null, undefined].forEach(value => {
        expect(
          () => new NonNegativeFiniteNumber(value)
        ).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let n = new NonNegativeFiniteNumber(6);
    expect(n.getValue()).toBe(6);

    n.setValue(0);
    expect(n.getValue()).toBe(0);

    n.setValue(236.197951);
    expect(n.getValue()).toBe(236.197951);
  });

  describe('setValue method', () => {
    it('sets the value', () => {
      let n = new NonNegativeFiniteNumber(0);

      [0, 1, 0.000184, 2879, 64.3349].forEach(value => {
        n.setValue(value);
        expect(n.getValue()).toBe(value);
      });
    });

    it('throws for values that are negative', () => {
      [-1, -0.0002783, -472, -28.1897].forEach(value => {
        let n = new NonNegativeFiniteNumber(0);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        let n = new NonNegativeFiniteNumber(0);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['zxcv', true, {}, null, undefined].forEach(value => {
        let n = new NonNegativeFiniteNumber(0);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });
  });
});
