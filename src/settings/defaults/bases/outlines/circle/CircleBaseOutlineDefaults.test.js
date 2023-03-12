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

  test('toSaved method', () => {
    [
      ['r', 15.114], ['stroke', '#ff5061'], ['stroke-width', 12.088],
      ['stroke-opacity', 0.1882], ['fill', '#fa2381'],
      ['fill-opacity', 0.51189],
    ].forEach(attribute => {
      defaults.circle[attribute[0]].setValue(attribute[1]);
    });

    let saved = defaults.toSaved();

    expect(saved).toStrictEqual({
      circle: {
        'r': 15.114, 'stroke': '#ff5061', 'stroke-width': 12.088,
        'stroke-opacity': 0.1882, 'fill': '#fa2381', 'fill-opacity': 0.51189,
      },
    });

    // test JSON conversion
    let json = JSON.stringify(saved);
    expect(JSON.parse(json)).toStrictEqual(saved);
  });

  describe('applySaved method', () => {
    it('applies saved values', () => {
      let circleAttributes = [
        ['r', 9.821], ['stroke', '#abe688'], ['stroke-width', 5.228],
        ['stroke-opacity', 0.7233], ['fill', '#2290ae'],
        ['fill-opacity', 0.2707],
      ];

      let saved = { circle: {} };
      circleAttributes.forEach(a => saved.circle[a[0]] = a[1]);

      defaults.applySaved(saved);

      circleAttributes.forEach(a => {
        expect(defaults.circle[a[0]].getValue()).toBe(a[1]);
      });
    });

    it('ignores invalid values', () => {
      let circleAttributes = [
        ['r', 15], ['stroke', '#abcdef'], ['stroke-width', 6],
        ['stroke-opacity', 0.7], ['fill', '#aaa556'], ['fill-opacity', 0.3],
      ];

      circleAttributes.forEach(a => defaults.circle[a[0]].setValue(a[1]));

      let saved = {
        circle: {
          'r': 'asd', 'stroke': 8, 'stroke-width': 'g', 'stroke-opacity': 'q',
          'fill': false, 'fill-opacity': {},
        },
      };

      defaults.applySaved(saved);

      circleAttributes.forEach(a => {
        expect(defaults.circle[a[0]].getValue()).toBe(a[1]);
      });
    });

    it('ignores undefined values', () => {
      let circleAttributes = [
        ['r', 6], ['stroke', '#123456'], ['stroke-width', 2],
        ['stroke-opacity', 0.78], ['fill', '#ced596'], ['fill-opacity', 0.35],
      ];

      circleAttributes.forEach(a => defaults.circle[a[0]].setValue(a[1]));

      let saved = { circle: {} };

      defaults.applySaved(saved);

      circleAttributes.forEach(a => {
        expect(defaults.circle[a[0]].getValue()).toBe(a[1]);
      });
    });
  });
});
