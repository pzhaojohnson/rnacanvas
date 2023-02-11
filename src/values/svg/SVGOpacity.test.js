import { SVGOpacity } from './SVGOpacity';

describe('SVGOpacity class', () => {
  describe('constructor', () => {
    it('sets the value', () => {
      [1, 0, 0.6, 0.2472, 0.018768].forEach(value => {
        let o = new SVGOpacity(value);
        expect(o.getValue()).toBe(value);
      });
    });

    it('throws for values less than 0', () => {
      [-1, -0.000176418, -4786, -0.17856].forEach(value => {
        expect(
          () => new SVGOpacity(value)
        ).toThrow();
      });
    });

    it('throws for values greater than 1', () => {
      [2, 1.000174618, 176, 1.4276].forEach(value => {
        expect(
          () => new SVGOpacity(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        expect(
          () => new SVGOpacity(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['asdf', true, {}, null, undefined].forEach(value => {
        expect(
          () => new SVGOpacity(value)
        ).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let o = new SVGOpacity(0.185);
    expect(o.getValue()).toBe(0.185);

    o.setValue(0.999);
    expect(o.getValue()).toBe(0.999);

    o.setValue(0);
    expect(o.getValue()).toBe(0);
  });

  describe('setValue method', () => {
    it('sets the value', () => {
      let o = new SVGOpacity(0.5);

      [0, 1, 0.6, 0.38756, 0.2376518].forEach(value => {
        o.setValue(value);
        expect(o.getValue()).toBe(value);
      });
    });

    it('throws for values less than 0', () => {
      [-1, -0.00001375618, -1756].forEach(value => {
        let o = new SVGOpacity(1);
        expect(
          () => o.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values greater than 1', () => {
      [2, 1.000012876, 12858].forEach(value => {
        let o = new SVGOpacity(1);
        expect(
          () => o.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not finite', () => {
      [NaN, Infinity, -Infinity].forEach(value => {
        let o = new SVGOpacity(1);
        expect(
          () => o.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not numbers', () => {
      ['Q', false, {}, null, undefined].forEach(value => {
        let o = new SVGOpacity(1);
        expect(
          () => o.setValue(value)
        ).toThrow();
      });
    });
  });
});
