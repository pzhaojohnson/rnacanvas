import { createBase } from 'Draw/bases/createBase';

import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDecorator } from './outline';

let decoratee = null;
let decorator = null;

let svg = null;

beforeEach(() => {
  decoratee = createBase('C');
  decorator = new BaseDecorator(decoratee);

  svg = SVG.SVG();
  svg.addTo(document.body);
});

afterEach(() => {
  svg.remove();
  svg = null;

  decorator = null;
  decoratee = null;
});

describe('BaseDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  describe('outline getter', () => {
    test('when the base has an outline', () => {
      let cbo = new CircleBaseOutline();
      decoratee._outline = cbo;
      expect(decorator.outline).toBe(cbo);
    });

    test('when the base does not have an outline', () => {
      expect(decoratee._outline).toBeUndefined();
      expect(decorator.outline).toBeUndefined();
    });
  });

  describe('outline setter', () => {
    it('stores the provided base outline', () => {
      let cbo = new CircleBaseOutline();
      decorator.outline = cbo;
      expect(decorator.outline).toBe(cbo);
    });

    it('repositions the provided base outline', () => {
      decoratee.setCenter({ x: 48199, y: 9816 });

      let cbo = new CircleBaseOutline();
      decorator.outline = cbo;

      expect(cbo.circle.attr('cx')).toBeCloseTo(48199);
      expect(cbo.circle.attr('cy')).toBeCloseTo(9816);
    });

    it('appends the provided base outline to the SVG document', () => {
      decoratee.text.addTo(svg);

      let cbo = new CircleBaseOutline();
      decorator.outline = cbo;

      let n = svg.children().length;
      expect(svg.children()[n - 1]).toBe(cbo.circle);
    });

    it('does not throw if there is no SVG document to append to', () => {
      expect(decoratee.text.root()).toBeFalsy();

      let cbo = new CircleBaseOutline();
      decorator.outline = cbo;

      expect(cbo.parent).toBeFalsy();
    });

    it('removes any outline that the base already had', () => {
      decoratee.text.addTo(svg);

      let cbo1 = new CircleBaseOutline();
      decorator.outline = cbo1;
      expect(decorator.outline).toBe(cbo1);

      // was added to the SVG document
      expect(cbo1.parent).toBe(svg);

      let cbo2 = new CircleBaseOutline();
      decorator.outline = cbo2;
      expect(decorator.outline).toBe(cbo2);

      // was removed from the SVG document
      expect(cbo1.parent).toBeFalsy();
    });

    describe('when passed a value of undefined', () => {
      it('removes the outline of the base', () => {
        decoratee.text.addTo(svg);

        let cbo = new CircleBaseOutline();
        decorator.outline = cbo;
        expect(decorator.outline).toBe(cbo);

        // was added to the SVG document
        expect(cbo.parent).toBe(svg);

        decorator.outline = undefined;
        expect(decorator.outline).toBeUndefined();

        // was removed from the SVG document
        expect(cbo.parent).toBeFalsy();
      });

      it('does nothing if the base already had no outline', () => {
        expect(decorator.outline).toBeUndefined();

        expect(() => {
          decorator.outline = undefined;
        }).not.toThrow();
      });
    });
  });
});
