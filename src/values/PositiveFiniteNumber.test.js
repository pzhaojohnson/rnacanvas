import { PositiveFiniteNumber } from './PositiveFiniteNumber';

describe('PositiveFiniteNumber class', () => {
  describe('constructor', () => {
    it('sets the value', () => {
      [1, 5, 19819, 25.19419].forEach(value => {
        let n = new PositiveFiniteNumber(value);
        expect(n.getValue()).toBe(value);
      });
    });

    it('throws for values that are not positive', () => {
      [0, -1, -37, -319, -0.3876148].forEach(value => {
        expect(
          () => new PositiveFiniteNumber(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        expect(
          () => new PositiveFiniteNumber(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['asdf', true, {}, null, undefined].forEach(value => {
        expect(
          () => new PositiveFiniteNumber(value)
        ).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let n = new PositiveFiniteNumber(1);
    expect(n.getValue()).toBe(1);

    n.setValue(716247);
    expect(n.getValue()).toBe(716247);

    n.setValue(51.18529);
    expect(n.getValue()).toBe(51.18529);
  });

  describe('setValue method', () => {
    it('sets the value', () => {
      let n = new PositiveFiniteNumber(5);

      [1, 2, 98, 5.174618].forEach(value => {
        n.setValue(value);
        expect(n.getValue()).toBe(value);
      });
    });

    it('throws for values that are not positive', () => {
      [0, -1, -37, -0.317685].forEach(value => {
        let n = new PositiveFiniteNumber(1);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        let n = new PositiveFiniteNumber(1);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['A', false, {}, null, undefined].forEach(value => {
        let n = new PositiveFiniteNumber(1);
        expect(
          () => n.setValue(value)
        ).toThrow();
      });
    });
  });

  test('toSaved method', () => {
    let n = new PositiveFiniteNumber(18.19579);
    let saved = n.toSaved();
    expect(saved).toBe(18.19579);

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toBe(18.19579);
  });

  describe('applySaved method', () => {
    it('applies saved values', () => {
      let n = new PositiveFiniteNumber(15);
      n.applySaved(513.371586);
      expect(n.getValue()).toBe(513.371586);
    });

    it('ignores invalid saved values', () => {
      let n = new PositiveFiniteNumber(194.175);

      [0, -1, true, {}, null].forEach(saved => {
        n.applySaved(saved);
      });

      expect(n.getValue()).toBe(194.175);
    });

    it('ignores values of undefined', () => {
      let n = new PositiveFiniteNumber(12.38);
      n.applySaved(undefined);
      expect(n.getValue()).toBe(12.38);
    });
  });
});
