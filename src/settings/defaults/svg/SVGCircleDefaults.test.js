import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { SVGCircleDefaults } from './SVGCircleDefaults';

let svg = null;

let circle = null;

let randomValues = null;

let randomDefaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circle = svg.circle(50);

  randomValues = [
    ['r', 20 * Math.random()],
    ['stroke', SVGColor.random().toHex()],
    ['stroke-width', 12 * Math.random()],
    ['stroke-opacity', Math.random()],
    ['fill', SVGColor.random().toHex()],
    ['fill-opacity', Math.random()],
  ];

  randomDefaults = new SVGCircleDefaults();

  randomValues.forEach(v => {
    randomDefaults[v[0]].setValue(v[1]);
  });
});

afterEach(() => {
  randomDefaults = null;

  randomValues = null;

  circle = null;

  svg.remove();
  svg = null;
});

describe('SVGCircleDefaults class', () => {
  describe('applyTo method', () => {
    beforeEach(() => {
      randomDefaults.applyTo(circle);
    });

    it('sets the values of the SVG circle element', () => {
      randomValues.forEach(v => {
        expect(circle.attr(v[0])).toBe(v[1]);
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

    it('includes all default values', () => {
      randomValues.forEach(v => {
        expect(saved[v[0]]).toBe(v[1]);
      });
    });
  });

  describe('applySaved method', () => {
    it('applies all saved values', () => {
      let defaults = new SVGCircleDefaults();
      defaults.applySaved(randomDefaults.toSaved());

      randomValues.forEach(v => {
        expect(defaults[v[0]].getValue()).toBe(v[1]);
      });
    });

    test('invalid saved values', () => {
      randomDefaults.applySaved({
        'r': 'Q',
        'stroke': {},
        'stroke-width': true,
        'stroke-opacity': 'asdf',
        'fill': 88,
        'fill-opacity': null,
      });

      randomValues.forEach(v => {
        expect(randomDefaults[v[0]].getValue()).toBe(v[1]);
      });
    });

    test('undefined saved values', () => {
      // an empty saved object
      randomDefaults.applySaved({});

      // just a value of undefined
      randomDefaults.applySaved(undefined);

      randomValues.forEach(v => {
        expect(randomDefaults[v[0]].getValue()).toBe(v[1]);
      });
    });

    it('processes saved values individually', () => {
      let defaults = new SVGCircleDefaults();

      defaults['r'].setValue(5.6);
      defaults['stroke'].setValue('#001122');
      defaults['stroke-width'].setValue(2);

      defaults.applySaved({
        // invalid
        'r': 'asdf',

        'stroke': undefined,

        // should still get applied
        'stroke-width': 12.3809,
      });

      expect(defaults['r'].getValue()).toBe(5.6);
      expect(defaults['stroke'].getValue()).toBe('#001122');
      expect(defaults['stroke-width'].getValue()).toBe(12.3809);
    });
  });
});
