import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDefaults } from './BaseDefaults';

let svg = null;

let base = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  base = new Base({
    text: svg.text('A'),
  });

  defaults = new BaseDefaults();
});

afterEach(() => {
  defaults = null;

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
    defaults.text['font-family'].setValue('Courier New');
    defaults.text['font-size'].setValue(29.8);
    defaults.text['font-weight'].setValue(312.9);
    defaults.text['font-style'].setValue('oblique');

    defaults.applyTo(base);
    expect(base.text.attr('font-family')).toBe('Courier New');
    expect(base.text.attr('font-size')).toBe(29.8);
    expect(base.text.attr('font-weight')).toBe(312.9);
    expect(base.text.attr('font-style')).toBe('oblique');
  });

  test('toSaved method', () => {
    defaults.text['font-family'].setValue('Consolas');
    defaults.text['font-size'].setValue(4.89);
    defaults.text['font-weight'].setValue(709.1);
    defaults.text['font-style'].setValue('italic');

    let saved = defaults.toSaved();

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
      defaults.text['font-family'].setValue('Arial');
      defaults.text['font-size'].setValue(9);
      defaults.text['font-weight'].setValue(700);
      defaults.text['font-style'].setValue('normal');

      let saved = defaults.toSaved();
      saved.text['font-family'] = '"Gill Sans"';
      saved.text['font-size'] = 112.05;
      saved.text['font-weight'] = 802.55;
      saved.text['font-style'] = 'italic';

      defaults.applySaved(saved);
      expect(defaults.text['font-family'].getValue()).toBe('"Gill Sans"');
      expect(defaults.text['font-size'].getValue()).toBe(112.05);
      expect(defaults.text['font-weight'].getValue()).toBe(802.55);
      expect(defaults.text['font-style'].getValue()).toBe('italic');
    });

    it('ignores invalid values', () => {
      defaults.text['font-family'].setValue('Helvetica');
      defaults.text['font-size'].setValue(12.15);
      defaults.text['font-weight'].setValue(380.2);
      defaults.text['font-style'].setValue('oblique');

      let saved = defaults.toSaved();
      saved.text['font-family'] = 55;
      saved.text['font-size'] = -2;
      saved.text['font-weight'] = 'asdf';
      saved.text['font-style'] = 'zxcv';

      defaults.applySaved(saved);
      expect(defaults.text['font-family'].getValue()).toBe('Helvetica');
      expect(defaults.text['font-size'].getValue()).toBe(12.15);
      expect(defaults.text['font-weight'].getValue()).toBe(380.2);
      expect(defaults.text['font-style'].getValue()).toBe('oblique');
    });

    it('ignores undefined values', () => {
      // just test some values
      defaults.text['font-size'].setValue(8.8);
      defaults.text['font-weight'].setValue(566);

      let saved = defaults.toSaved();
      saved.text['font-size'] = undefined;
      saved.text['font-weight'] = undefined;

      defaults.applySaved(saved);
      expect(defaults.text['font-size'].getValue()).toBe(8.8);
      expect(defaults.text['font-weight'].getValue()).toBe(566);
    });
  });
});
