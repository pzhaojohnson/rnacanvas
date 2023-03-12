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
});
