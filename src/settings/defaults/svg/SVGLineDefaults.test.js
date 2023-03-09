import * as SVG from 'Draw/svg/NodeSVG';

import { SVGLineDefaults } from './SVGLineDefaults';

let svg = null;

let line = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  line = svg.line(10, 100, 35, 678);

  defaults = new SVGLineDefaults();
});

afterEach(() => {
  defaults = null;

  line = null;

  svg.remove();
  svg = null;
});

describe('SVGLineDefaults class', () => {
  test('applyTo method', () => {
    defaults['stroke'].setValue('#55abc2');
    defaults['stroke-width'].setValue(8.043);
    defaults['stroke-opacity'].setValue(0.1903);

    defaults.applyTo(line);

    expect(line.attr('stroke')).toBe('#55abc2');
    expect(line.attr('stroke-width')).toBe(8.043);
    expect(line.attr('stroke-opacity')).toBe(0.1903);
  });

  test('toSaved method', () => {
    defaults['stroke'].setValue('#01b0ff');
    defaults['stroke-width'].setValue(19.902);
    defaults['stroke-opacity'].setValue(0.8022);

    let saved = defaults.toSaved();

    expect(saved).toStrictEqual({
      'stroke': '#01b0ff',
      'stroke-width': 19.902,
      'stroke-opacity': 0.8022,
    });

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toStrictEqual(saved);
  });
});
