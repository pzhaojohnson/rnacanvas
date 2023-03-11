import * as SVG from 'Draw/svg/NodeSVG';

import { SVGFontFamily } from './SVGFontFamily';

test('setting the font-family attribute to any string', () => {
  let svg = SVG.SVG();
  svg.addTo(document.body);

  let text = svg.text('asdf');

  // seems like can be set to any string without throwing
  ['', '   ', '\t\n\t', 'asdf', 'qwer', 'aoja, .zmsg'].forEach(value => {
    expect(() => text.attr('font-family', value))
      .not.toThrow();
  });

  // don't forget to remove
  svg.remove();
});

describe('SVGFontFamily class', () => {
  describe('constructor', () => {
    test('valid font-family values', () => {
      [
        'Helvetica',
        '"Comic Sans"',
        '"Times New Roman", serif',
      ].forEach(value => {
        let ff = new SVGFontFamily(value);
        expect(ff.getValue()).toBe(value);
      });
    });

    test('invalid string values', () => {
      // currently accepts any string value
      ['', '   ', 'asdf', '3597'].forEach(value => {
        let ff = new SVGFontFamily(value);
        expect(ff.getValue()).toBe(value);
      });
    });

    test('values that are not strings', () => {
      [2, true, {}, null, undefined].forEach(value => {
        expect(() => new SVGFontFamily(value))
          .toThrow();
      });
    });
  });

  test('getValue method', () => {
    let ff = new SVGFontFamily('Courier New');
    expect(ff.getValue()).toBe('Courier New');

    ff.setValue('"Open Sans", sans-serif');
    expect(ff.getValue()).toBe('"Open Sans", sans-serif');

    ff.setValue('"Times New Roman", serif');
    expect(ff.getValue()).toBe('"Times New Roman", serif');
  });

  describe('setValue method', () => {
    test('valid font-family values', () => {
      let ff = new SVGFontFamily('Times');

      [
        'Consolas',
        'Courier, monospace',
        'Helvetica, "Trebuchet MS", Verdana, sans-serif',
      ].forEach(value => {
        ff.setValue(value);
        expect(ff.getValue()).toBe(value);
      });
    });

    test('invalid string values', () => {
      let ff = new SVGFontFamily('"Open Sans"');

      // currently accepts any string value
      ['', '\t\n ', 'qwer', '3197'].forEach(value => {
        ff.setValue(value);
        expect(ff.getValue()).toBe(value);
      });
    });

    test('values that are not strings', () => {
      [0, false, {}, null, undefined].forEach(value => {
        let ff = new SVGFontFamily('Consolas');

        expect(() => ff.setValue(value))
          .toThrow();

        // unchanged
        expect(ff.getValue()).toBe('Consolas');
      });
    });
  });

  test('toSaved method', () => {
    let ff = new SVGFontFamily('"Comic Sans", cursive');
    let saved = ff.toSaved();
    expect(saved).toBe('"Comic Sans", cursive');

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toBe('"Comic Sans", cursive');
  });

  describe('applySaved method', () => {
    it('applies saved values', () => {
      let ff = new SVGFontFamily('"Courier New"');
      ff.applySaved('"Brush Script MT"');
      expect(ff.getValue()).toBe('"Brush Script MT"');
    });

    it('ignores invalid saved values', () => {
      let ff = new SVGFontFamily('"Lucida Bright", serif');

      [2, true, {}, null].forEach(saved => {
        ff.applySaved(saved);
      });

      expect(ff.getValue()).toBe('"Lucida Bright", serif');
    });

    it('ignores values of undefined', () => {
      let ff = new SVGFontFamily('"Gill Sans", sans-serif');
      ff.applySaved(undefined);
      expect(ff.getValue()).toBe('"Gill Sans", sans-serif');
    });
  });
});
