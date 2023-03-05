import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutlineDefaults } from './CircleBaseOutlineDefaults';

let svg = null;

let circleBaseOutline = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline();
  circleBaseOutline.appendTo(svg);

  defaults = new CircleBaseOutlineDefaults();
});

afterEach(() => {
  defaults = null;

  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutlineDefaults class', () => {
  test('constructor', () => {
    expect(() => new CircleBaseOutlineDefaults())
      .not.toThrow();
  });

  test('applyTo method', () => {
    defaults.circle['r'].setValue(18.089);
    defaults.circle['stroke'].setValue('#48b3f1');
    defaults.circle['stroke-width'].setValue(8.1174);
    defaults.circle['stroke-opacity'].setValue(0.6038);
    defaults.circle['fill'].setValue('#aa902c');
    defaults.circle['fill-opacity'].setValue(0.9421);

    defaults.applyTo(circleBaseOutline);
    expect(circleBaseOutline.circle.attr('r')).toBe(18.089);
    expect(circleBaseOutline.circle.attr('stroke')).toBe('#48b3f1');
    expect(circleBaseOutline.circle.attr('stroke-width')).toBe(8.1174);
    expect(circleBaseOutline.circle.attr('stroke-opacity')).toBe(0.6038);
    expect(circleBaseOutline.circle.attr('fill')).toBe('#aa902c');
    expect(circleBaseOutline.circle.attr('fill-opacity')).toBe(0.9421);
  });
});
