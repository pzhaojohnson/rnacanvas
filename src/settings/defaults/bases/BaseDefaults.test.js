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

    expect(saved).toStrictEqual({
      text: {
        'font-family': 'Consolas',
        'font-size': 4.89,
        'font-weight': 709.1,
        'font-style': 'italic',
      },
    });

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toStrictEqual(saved);
  });
});
