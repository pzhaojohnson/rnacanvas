import { SVGFontStyle } from './SVGFontStyle';

describe('SVGFontStyle class', () => {
  describe('constructor', () => {
    test('all keyword values', () => {
      ['normal', 'italic', 'oblique'].forEach(value => {
        let fs = new SVGFontStyle(value);
        expect(fs.getValue()).toBe(value);
      });
    });

    test('strings that are not keyword values', () => {
      ['', '   ', 'qwer'].forEach(value => {
        expect(() => new SVGFontStyle(value)).toThrow();
      });
    });

    test('values that are not strings', () => {
      [55, false, {}, null, undefined].forEach(value => {
        expect(() => new SVGFontStyle(value)).toThrow();
      });
    });
  });

  test('getValue method', () => {
    let fs = new SVGFontStyle('oblique');
    expect(fs.getValue()).toBe('oblique');

    fs.setValue('italic');
    expect(fs.getValue()).toBe('italic');

    fs.setValue('normal');
    expect(fs.getValue()).toBe('normal');
  });

  describe('setValue method', () => {
    test('all keyword values', () => {
      let fs = new SVGFontStyle('italic');

      ['normal', 'italic', 'oblique'].forEach(value => {
        fs.setValue(value);
        expect(fs.getValue()).toBe(value);
      });
    });

    test('strings that are not keyword values', () => {
      ['', '   \t  ', 'asdf'].forEach(value => {
        let fs = new SVGFontStyle('oblique');

        expect(() => fs.setValue(value)).toThrow();

        // unchanged
        expect(fs.getValue()).toBe('oblique');
      });
    });

    test('values that are not strings', () => {
      [2, true, {}, null, undefined].forEach(value => {
        let fs = new SVGFontStyle('italic');

        expect(() => fs.setValue(value)).toThrow();

        // unchanged
        expect(fs.getValue()).toBe('italic');
      });
    });
  });
});
