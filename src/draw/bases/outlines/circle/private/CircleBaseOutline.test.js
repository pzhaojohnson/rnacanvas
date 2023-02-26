import * as SVG from '@svgdotjs/svg.js';

import { uuidRegex } from 'Utilities/uuidRegex';

import { CircleBaseOutline } from './CircleBaseOutline';

describe('CircleBaseOutline class', () => {
  describe('constructor', () => {
    it('stores the provided circle element', () => {
      let circle = new SVG.Circle();
      let outline = new CircleBaseOutline({ circle });
      expect(outline.circle).toBe(circle);
    });

    it('creates a new circle element when one is not provided', () => {
      let outline = new CircleBaseOutline();
      expect(outline.circle).toBeInstanceOf(SVG.Circle);
    });

    it('caches the provided base center', () => {
      let baseCenter = { x: 56.187, y: 903.752 };
      let outline = new CircleBaseOutline({ baseCenter });
      expect(outline.cachedBaseCenter).toStrictEqual(baseCenter);
    });

    test('when the base center is not provided', () => {
      let outline = new CircleBaseOutline();
      expect(outline.cachedBaseCenter).toBeUndefined();
    });

    it('will initialize the ID of the provided circle element', () => {
      let circle = new SVG.Circle();
      expect(circle.attr('id')).toBeFalsy();

      let outline = new CircleBaseOutline({ circle });

      expect(outline.circle.attr('id')).toMatch(uuidRegex);
      expect(outline.circle.attr('id').length).toBeGreaterThanOrEqual(36);

      // must start with a letter in SVG
      expect(outline.circle.attr('id').startsWith('uuid-')).toBeTruthy();
    });

    it('does not overwrite the ID of the provided circle element', () => {
      let circle = new SVG.Circle();
      circle.attr('id', 'id-1274618246');

      let outline = new CircleBaseOutline({ circle });
      expect(circle.attr('id')).toBe('id-1274618246');
    });

    it('initializes the ID when creating a new circle element', () => {
      let outline = new CircleBaseOutline();

      expect(outline.circle.attr('id')).toMatch(uuidRegex);
      expect(outline.circle.attr('id').length).toBeGreaterThanOrEqual(36);

      // must start with a letter in SVG
      expect(outline.circle.attr('id').startsWith('uuid-')).toBeTruthy();
    });

    it('initializes event listeners object', () => {
      let outline = new CircleBaseOutline();

      expect(outline.eventListeners).toStrictEqual({
        'move': [],
        'remove': [],
      });
    });
  });
});
