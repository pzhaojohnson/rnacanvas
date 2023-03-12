import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { SVGCircleDefaults } from './SVGCircleDefaults';

let svg = null;

let circle = null;

let defaults = null;

let randomAttributes = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circle = svg.circle(50);

  defaults = new SVGCircleDefaults();

  randomAttributes = [
    ['r', 20 * Math.random()],
    ['stroke', SVGColor.random().toHex()],
    ['stroke-width', 12 * Math.random()],
    ['stroke-opacity', Math.random()],
    ['fill', SVGColor.random().toHex()],
    ['fill-opacity', Math.random()],
  ];
});

afterEach(() => {
  randomAttributes = null;

  defaults = null;

  circle = null;

  svg.remove();
  svg = null;
});

describe('SVGCircleDefaults class', () => {
  describe('applyTo method', () => {
    beforeEach(() => {
      randomAttributes.forEach(a => {
        defaults[a[0]].setValue(a[1]);
      });

      defaults.applyTo(circle);
    });

    it('sets the values of the SVG circle element', () => {
      randomAttributes.forEach(a => {
        expect(circle.attr(a[0])).toBe(a[1]);
      });
    });
  });
});
