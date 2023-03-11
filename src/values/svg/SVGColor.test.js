import { SVGColor } from './SVGColor';

describe('SVGColor class', () => {
  describe('constructor', () => {
    it('sets the value', () => {
      ['#12CD5F', 'rgb(10, 20, 5)', '#55f'].forEach(value => {
        let c = new SVGColor(value);
        expect(c.getValue()).toBe(value);
      });
    });

    it('throws for strings that are not valid SVG colors', () => {
      ['#1234567', 'rgb(1, 2)', '#AB'].forEach(value => {
        expect(
          () => new SVGColor(value)
        ).toThrow();
      });
    });

    it('throws for blank strings', () => {
      ['', '   ', '\t\n'].forEach(value => {
        expect(
          () => new SVGColor(value)
        ).toThrow();
      });
    });

    it('throws for values that are not strings', () => {
      [2, true, {}, null, undefined].forEach(value => {
        expect(
          () => new SVGColor(value)
        ).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let c = new SVGColor('#1289bc');
    expect(c.getValue()).toBe('#1289bc');

    c.setValue('rgb(128, 5, 88)');
    expect(c.getValue()).toBe('rgb(128, 5, 88)');

    c.setValue('#12B');
    expect(c.getValue()).toBe('#12B');
  });

  describe('setValue method', () => {
    it('sets the value', () => {
      let c = new SVGColor('#000000');

      ['#55BAcd', 'rgb(55, 43, 1)', '#FFA'].forEach(value => {
        c.setValue(value);
        expect(c.getValue()).toBe(value);
      });
    });

    it('throws for strings that are not valid SVG colors', () => {
      ['#abcde', 'rgb(1, 2, 3, 4)', '#1234'].forEach(value => {
        let c = new SVGColor('#000000');
        expect(
          () => c.setValue(value)
        ).toThrow();
      });
    });

    it('throws for blank strings', () => {
      ['', '     ', '\t\t\n\n'].forEach(value => {
        let c = new SVGColor('#000000');
        expect(
          () => c.setValue(value)
        ).toThrow();
      });
    });

    it('throws for values that are not strings', () => {
      [0, false, {}, null, undefined].forEach(value => {
        let c = new SVGColor('#000000');
        expect(
          () => c.setValue(value)
        ).toThrow();
      });
    });
  });

  describe('toSaved method', () => {
    it('returns the primitive value', () => {
      let c = new SVGColor('#ab9be2');
      expect(c.toSaved()).toBe('#ab9be2');

      c.setValue('rgb(129, 8, 19)');
      expect(c.toSaved()).toBe('rgb(129, 8, 19)');

      c.setValue('#bb1');
      expect(c.toSaved()).toBe('#bb1');
    });

    test('JSON conversion', () => {
      ['#18492a', 'rgb(100, 50, 156)', '#ab8'].forEach(value => {
        let c = new SVGColor(value);
        let saved = c.toSaved();
        let json = JSON.stringify(saved);
        expect(JSON.parse(json)).toBe(saved);
      });
    });
  });

  describe('applySaved method', () => {
    it('applies saved values', () => {
      let c = new SVGColor('#000000');

      c.applySaved('#cf0014');
      expect(c.getValue()).toBe('#cf0014');

      c.applySaved('rgb(25, 189, 250)');
      expect(c.getValue()).toBe('rgb(25, 189, 250)');
    });

    it('ignores invalid saved values', () => {
      let c = new SVGColor('#bae092');

      ['asdf', 5, true, {}, null].forEach(saved => {
        c.applySaved(saved);
      });

      expect(c.getValue()).toBe('#bae092');
    });

    it('ignores values of undefined', () => {
      let c = new SVGColor('#aab185');
      c.applySaved(undefined);
      expect(c.getValue()).toBe('#aab185');
    });
  });
});
