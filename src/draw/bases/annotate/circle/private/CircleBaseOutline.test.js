import * as SVG from '@svgdotjs/svg.js';

import { CircleBaseOutline } from './CircleBaseOutline';

describe('CircleBaseOutline class', () => {
  describe('constructor', () => {
    test('when no arguments are provided', () => {
      let outline = new CircleBaseOutline();

      expect(outline.circle).toBeInstanceOf(SVG.Circle);
      expect(outline.cachedBaseCenter).toBeUndefined();
    });

    test('when only the circle element is provided', () => {
      let circle = new SVG.Circle();
      let outline = new CircleBaseOutline({ circle });

      expect(outline.circle).toBe(circle);
      expect(outline.cachedBaseCenter).toBeUndefined();
    });

    test('when only the base center is provided', () => {
      let baseCenter = { x: 1102.56, y: 948.74 };
      let outline = new CircleBaseOutline({ baseCenter });

      expect(outline.circle).toBeInstanceOf(SVG.Circle);
      expect(outline.cachedBaseCenter).toEqual({ x: 1102.56, y: 948.74 });
    });
  });
});
