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
  describe('applyTo method', () => {
    it('applies circle defaults', () => {
      defaults.circle['r'].setValue(18.089);
      defaults.circle['stroke-width'].setValue(8.1174);

      defaults.applyTo(circleBaseOutline);

      expect(circleBaseOutline.circle.attr('r')).toBe(18.089);
      expect(circleBaseOutline.circle.attr('stroke-width')).toBe(8.1174);
    });
  });

  describe('toSaved method', () => {
    beforeEach(() => {
      defaults.circle['stroke'].setValue('#ff5061');
      defaults.circle['fill-opacity'].setValue(0.51189);
    });

    it('includes circle defaults', () => {
      let saved = defaults.toSaved();
      expect(saved.circle['stroke']).toBe('#ff5061');
      expect(saved.circle['fill-opacity']).toBe(0.51189);
    });

    test('JSON conversion', () => {
      let saved = defaults.toSaved();
      let json = JSON.stringify(saved);
      expect(JSON.parse(json)).toStrictEqual(saved);
    });
  });

  describe('applySaved method', () => {
    it('applies saved circle defaults', () => {
      defaults.applySaved({
        circle: {
          'r': 9.821,
          'fill': '#2290ae',
        },
      });

      expect(defaults.circle['r'].getValue()).toBe(9.821);
      expect(defaults.circle['fill'].getValue()).toBe('#2290ae');
    });

    test('some invalid saved circle defaults', () => {
      let saved = {
        circle: {
          'stroke-opacity': 'asdf',
          'fill': 89,
        },
      };

      expect(() => defaults.applySaved(saved))
        .not.toThrow();
    });

    test('undefined saved values', () => {
      // empty saved circle defaults object
      expect(() => defaults.applySaved({ circle: {} }))
        .not.toThrow();

      // missing saved circle defaults object
      expect(() => defaults.applySaved({}))
        .not.toThrow();

      // just a value of undefined
      expect(() => defaults.applySaved(undefined))
        .not.toThrow();
    });
  });
});
