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
});
