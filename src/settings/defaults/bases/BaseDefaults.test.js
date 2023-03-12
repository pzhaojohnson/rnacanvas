import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDefaults } from './BaseDefaults';

let svg = null;

let base = null;

let baseDefaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  base = new Base({
    text: svg.text('A'),
  });

  baseDefaults = new BaseDefaults();
});

afterEach(() => {
  baseDefaults = null;

  base = null;

  svg.remove();
  svg = null;
});

describe('BaseDefaults class', () => {
  test('constructor', () => {
    expect(() => new BaseDefaults())
      .not.toThrow();
  });

  test('applyTo method', () => {
    baseDefaults.text['font-family'].setValue('Courier New');
    baseDefaults.text['font-size'].setValue(29.8);
    baseDefaults.text['font-weight'].setValue(312.9);
    baseDefaults.text['font-style'].setValue('oblique');

    baseDefaults.applyTo(base);
    expect(base.text.attr('font-family')).toBe('Courier New');
    expect(base.text.attr('font-size')).toBe(29.8);
    expect(base.text.attr('font-weight')).toBe(312.9);
    expect(base.text.attr('font-style')).toBe('oblique');
  });

  test('toSaved method', () => {
    baseDefaults.text['font-family'].setValue('Consolas');
    baseDefaults.text['font-size'].setValue(4.89);
    baseDefaults.text['font-weight'].setValue(709.1);
    baseDefaults.text['font-style'].setValue('italic');

    let saved = baseDefaults.toSaved();

    expect(saved.text['font-family']).toBe('Consolas');
    expect(saved.text['font-size']).toBe(4.89);
    expect(saved.text['font-weight']).toBe(709.1);
    expect(saved.text['font-style']).toBe('italic');

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toStrictEqual(saved);
  });

  describe('applySaved method', () => {
    it('applies saved values', () => {
      baseDefaults.text['font-family'].setValue('Arial');
      baseDefaults.text['font-size'].setValue(9);
      baseDefaults.text['font-weight'].setValue(700);
      baseDefaults.text['font-style'].setValue('normal');

      let saved = baseDefaults.toSaved();
      saved.text['font-family'] = '"Gill Sans"';
      saved.text['font-size'] = 112.05;
      saved.text['font-weight'] = 802.55;
      saved.text['font-style'] = 'italic';

      baseDefaults.applySaved(saved);
      expect(baseDefaults.text['font-family'].getValue()).toBe('"Gill Sans"');
      expect(baseDefaults.text['font-size'].getValue()).toBe(112.05);
      expect(baseDefaults.text['font-weight'].getValue()).toBe(802.55);
      expect(baseDefaults.text['font-style'].getValue()).toBe('italic');
    });

    it('ignores invalid values', () => {
      baseDefaults.text['font-family'].setValue('Helvetica');
      baseDefaults.text['font-size'].setValue(12.15);
      baseDefaults.text['font-weight'].setValue(380.2);
      baseDefaults.text['font-style'].setValue('oblique');

      let saved = baseDefaults.toSaved();
      saved.text['font-family'] = 55;
      saved.text['font-size'] = -2;
      saved.text['font-weight'] = 'asdf';
      saved.text['font-style'] = 'zxcv';

      baseDefaults.applySaved(saved);
      expect(baseDefaults.text['font-family'].getValue()).toBe('Helvetica');
      expect(baseDefaults.text['font-size'].getValue()).toBe(12.15);
      expect(baseDefaults.text['font-weight'].getValue()).toBe(380.2);
      expect(baseDefaults.text['font-style'].getValue()).toBe('oblique');
    });

    it('ignores undefined values', () => {
      // just test some values
      baseDefaults.text['font-size'].setValue(8.8);
      baseDefaults.text['font-weight'].setValue(566);

      let saved = baseDefaults.toSaved();
      saved.text['font-size'] = undefined;
      saved.text['font-weight'] = undefined;

      baseDefaults.applySaved(saved);
      expect(baseDefaults.text['font-size'].getValue()).toBe(8.8);
      expect(baseDefaults.text['font-weight'].getValue()).toBe(566);
    });
  });
});
