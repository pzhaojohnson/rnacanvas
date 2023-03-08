import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';

import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { PrimaryBondDefaults } from './PrimaryBondDefaults';

let svg = null;

let primaryBond = null;

let randomLineAttributes = null;
let randomProperties = null;

let randomDefaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);
});

/**
 * Create a primary bond.
 */
beforeEach(() => {
  let base1 = new Base({ text: svg.text('A') });
  let base2 = new Base({ text: svg.text('U') });

  base1.recenter({ x: 10, y: 20 });
  base2.recenter({ x: 30, y: 50 });

  let line = svg.line(12, 23, 28, 47);

  primaryBond = new PrimaryBond(line, base1, base2);
});

/**
 * Generate some random line attributes and properties.
 */
beforeEach(() => {
  randomLineAttributes = [
    ['stroke', SVGColor.random().toHex()],
    ['stroke-width', 20 * Math.random()],
    ['stroke-opacity', Math.random()],
  ];

  randomProperties = [
    ['basePadding1', 9 * Math.random()],
    ['basePadding2', 6 * Math.random()],
  ];
});

/**
 * Create a random defaults object and assign it the random line
 * attributes and properties generated beforehand.
 */
beforeEach(() => {
  randomDefaults = new PrimaryBondDefaults();

  randomLineAttributes
    .forEach(a => randomDefaults.line[a[0]].setValue(a[1]));

  randomProperties
    .forEach(p => randomDefaults[p[0]].setValue(p[1]));
});

afterEach(() => {
  randomDefaults = null;

  randomLineAttributes = null;
  randomProperties = null;

  primaryBond = null;

  svg.remove();
  svg = null;
});

describe('PrimaryBondDefaults class', () => {
  test('constructor', () => {
    expect(() => new PrimaryBondDefaults())
      .not.toThrow();
  });

  describe('applyTo method', () => {
    beforeEach(() => {
      randomDefaults.applyTo(primaryBond);
    });

    it('applies line attributes', () => {
      randomLineAttributes.forEach(a => {
        expect(primaryBond.line.attr(a[0])).toBe(a[1]);
      });
    });

    it('applies properties', () => {
      randomProperties.forEach(p => {
        expect(primaryBond[p[0]]).toBeCloseTo(p[1]);
      });
    });
  });

  describe('toSaved method', () => {
    let saved = null;

    beforeEach(() => {
      saved = randomDefaults.toSaved();
    });

    afterEach(() => {
      saved = null;
    });

    it('includes line attributes', () => {
      randomLineAttributes.forEach(a => {
        expect(saved.line[a[0]]).toBe(a[1]);
      });
    });

    it('includes properties', () => {
      randomProperties.forEach(p => {
        expect(saved[p[0]]).toBeCloseTo(p[1]);
      });
    });

    test('JSON conversion', () => {
      let json = JSON.stringify(saved);
      expect(JSON.parse(json)).toStrictEqual(saved);
    });
  });
});
