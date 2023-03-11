import { keywordValues } from './SVGFontWeight';

import { SVGFontWeight } from './SVGFontWeight';

describe('SVGFontWeight class', () => {
  describe('constructor', () => {
    test('all keyword values', () => {
      keywordValues.forEach(value => {
        let fw = new SVGFontWeight(value);
        expect(fw.getValue()).toBe(value);
      });
    });

    test('number values between 1 and 1000 inclusive', () => {
      [1, 1000, 1.001874, 999.9997381, 385, 255.819].forEach(value => {
        let fw = new SVGFontWeight(value);
        expect(fw.getValue()).toBe(value);
      });
    });

    test('strings that are not keyword values', () => {
      ['', '   ', 'asdf', '50'].forEach(value => {
        expect(() => new SVGFontWeight(value)).toThrow();
      });
    });

    test('numbers less than 1', () => {
      [0, -1, 0.9999, -10].forEach(value => {
        expect(() => new SVGFontWeight(value)).toThrow();
      });
    });

    test('numbers greater than 1000', () => {
      [1001, 1000.0000398, 18317].forEach(value => {
        expect(() => new SVGFontWeight(value)).toThrow();
      });
    });

    test('values that are not strings or numbers', () => {
      [true, {}, null, undefined].forEach(value => {
        expect(() => new SVGFontWeight(value)).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let fw = new SVGFontWeight(500);
    expect(fw.getValue()).toBe(500);

    fw.setValue('bold');
    expect(fw.getValue()).toBe('bold');

    fw.setValue(100);
    expect(fw.getValue()).toBe(100);
  });

  describe('setValue method', () => {
    test('all keyword values', () => {
      keywordValues.forEach(value => {
        let fw = new SVGFontWeight(100);
        fw.setValue(value);
        expect(fw.getValue()).toBe(value);
      });
    });

    test('number values between 1 and 1000 inclusive', () => {
      [1, 1000, 1.000174, 999.9991274, 433, 29].forEach(value => {
        let fw = new SVGFontWeight('normal');
        fw.setValue(value);
        expect(fw.getValue()).toBe(value);
      });
    });

    test('strings that are not keyword values', () => {
      ['', '    ', 'qwer', '500'].forEach(value => {
        let fw = new SVGFontWeight('normal');

        expect(() => fw.setValue(value)).toThrow();

        // unchanged
        expect(fw.getValue()).toBe('normal');
      });
    });

    test('numbers less than 1', () => {
      [0, -1, 0.99999, -181].forEach(value => {
        let fw = new SVGFontWeight(600);

        expect(() => fw.setValue(value)).toThrow();

        // unchanged
        expect(fw.getValue()).toBe(600);
      });
    });

    test('numbers greater than 1000', () => {
      [1001, 1000.000147, 3187].forEach(value => {
        let fw = new SVGFontWeight('bold');

        expect(() => fw.setValue(value)).toThrow();

        // unchanged
        expect(fw.getValue()).toBe('bold');
      });
    });

    test('values that are not strings or numbers', () => {
      [false, {}, null, undefined].forEach(value => {
        let fw = new SVGFontWeight(400);

        expect(() => fw.setValue(value)).toThrow();

        // unchanged
        expect(fw.getValue()).toBe(400);
      });
    });
  });

  describe('toSaved method', () => {
    it('returns the primitive value', () => {
      // a number value
      let fw = new SVGFontWeight(398);
      expect(fw.toSaved()).toBe(398);

      // a keyword value
      fw.setValue('bolder');
      expect(fw.toSaved()).toBe('bolder');
    });

    test('JSON conversion', () => {
      // a number value
      let fw = new SVGFontWeight(712);
      let json = JSON.stringify(fw.toSaved());
      expect(JSON.parse(json)).toBe(712);

      // a keyword value
      fw.setValue('lighter');
      json = JSON.stringify(fw.toSaved());
      expect(JSON.parse(json)).toBe('lighter');
    });
  });
});
