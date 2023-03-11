import * as SVG from 'Draw/svg/NodeSVG';

import { SVGTextDefaults } from './SVGTextDefaults';

let svg = null;

let text = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  text = svg.text('asdf');

  defaults = new SVGTextDefaults();
});

afterEach(() => {
  defaults = null;

  text = null;

  svg.remove();
  svg = null;
});

describe('SVGTextDefaults class', () => {
  test('applyTo method', () => {
    defaults['font-family'].setValue('"Comic Sans", cursive');
    defaults['font-size'].setValue(19.4179);
    defaults['font-weight'].setValue(529);
    defaults['font-style'].setValue('oblique');
    defaults['fill'].setValue('#19cb22');
    defaults['fill-opacity'].setValue(0.3914);

    defaults.applyTo(text);

    expect(text.attr('font-family')).toBe('"Comic Sans", cursive');
    expect(text.attr('font-size')).toBe(19.4179);
    expect(text.attr('font-weight')).toBe(529);
    expect(text.attr('font-style')).toBe('oblique');
    expect(text.attr('fill')).toBe('#19cb22');
    expect(text.attr('fill-opacity')).toBe(0.3914);
  });

  test('toSaved method', () => {
    defaults['font-family'].setValue('"Courier New", monospace');
    defaults['font-size'].setValue(15.0142);
    defaults['font-weight'].setValue(718);
    defaults['font-style'].setValue('italic');
    defaults['fill'].setValue('#189bbc');
    defaults['fill-opacity'].setValue(0.8172);

    let saved = defaults.toSaved();

    expect(saved).toStrictEqual({
      'font-family': '"Courier New", monospace',
      'font-size': 15.0142,
      'font-weight': 718,
      'font-style': 'italic',
      'fill': '#189bbc',
      'fill-opacity': 0.8172,
    });

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toStrictEqual(saved);
  });

  describe('applySaved method', () => {
    beforeEach(() => {
      defaults['font-family'].setValue('"Arial Narrow"');
      defaults['font-size'].setValue(16.2);
      defaults['font-weight'].setValue(514);
      defaults['font-style'].setValue('normal');
      defaults['fill'].setValue('#bc0081');
      defaults['fill-opacity'].setValue(0.5214);
    });

    it('applies saved values', () => {
      defaults.applySaved({
        'font-family': '"Gill Sans", serif',
        'font-size': 17.2819,
        'font-weight': 281,
        'font-style': 'oblique',
        'fill': '#55ba93',
        'fill-opacity': 0.2811,
      });

      expect(defaults['font-family'].getValue()).toBe('"Gill Sans", serif');
      expect(defaults['font-size'].getValue()).toBe(17.2819);
      expect(defaults['font-weight'].getValue()).toBe(281);
      expect(defaults['font-style'].getValue()).toBe('oblique');
      expect(defaults['fill'].getValue()).toBe('#55ba93');
      expect(defaults['fill-opacity'].getValue()).toBe(0.2811);
    });

    it('ignores invalid saved values', () => {
      defaults.applySaved({
        'font-family': 2,
        'font-size': 'qwer',
        'font-weight': {},
        'font-style': 98,
        'fill': '6',
        'fill-opacity': 'Q',
      });

      expect(defaults['font-family'].getValue()).toBe('"Arial Narrow"');
      expect(defaults['font-size'].getValue()).toBe(16.2);
      expect(defaults['font-weight'].getValue()).toBe(514);
      expect(defaults['font-style'].getValue()).toBe('normal');
      expect(defaults['fill'].getValue()).toBe('#bc0081');
      expect(defaults['fill-opacity'].getValue()).toBe(0.5214);
    });

    it('ignores values of undefined', () => {
      defaults.applySaved({});
      defaults.applySaved(undefined);

      expect(defaults['font-family'].getValue()).toBe('"Arial Narrow"');
      expect(defaults['font-size'].getValue()).toBe(16.2);
      expect(defaults['font-weight'].getValue()).toBe(514);
      expect(defaults['font-style'].getValue()).toBe('normal');
      expect(defaults['fill'].getValue()).toBe('#bc0081');
      expect(defaults['fill-opacity'].getValue()).toBe(0.5214);
    });

    it('processes saved values on an individual basis', () => {
      defaults.applySaved({
        // invalid
        'font-size': 'asdf',

        'font-weight': undefined,

        // should still get applied
        'fill': '#509bfa',
      });

      expect(defaults['font-size'].getValue()).toBe(16.2);
      expect(defaults['font-weight'].getValue()).toBe(514);
      expect(defaults['fill'].getValue()).toBe('#509bfa');
    });
  });
});
