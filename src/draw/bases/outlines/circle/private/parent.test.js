import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { isNullish } from '@rnacanvas/value-check';

import { CircleBaseOutlineDecorator } from './parent';

let svg = null;

let circleBaseOutline = null;
let decorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline();

  decorator = (
    new CircleBaseOutlineDecorator(circleBaseOutline)
  );
});

afterEach(() => {
  decorator = null;
  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutlineDecorator class', () => {
  describe('parent getter', () => {
    test('when part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(decorator.parent).toBe(svg);
    });

    test('when not part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(decorator.parent)).toBeTruthy();
    });
  });

  describe('appendTo method', () => {
    test('when not already part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(decorator.parent)).toBeTruthy();

      // add some elements to be behind or in front of
      svg.rect(50, 20);
      svg.text('zxcv');
      svg.circle(22);
      svg.text('Q');

      decorator.appendTo(svg);

      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(decorator.parent).toBe(svg);

      let n = svg.children().length;

      // should be at the end of the SVG document
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });

    test('when already part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(decorator.parent).toBe(svg);

      // add some elements to be behind or in front of
      svg.circle(20);
      svg.rect(10, 20);
      svg.text('A');
      svg.text('qwer');

      let n = svg.children().length;
      expect(circleBaseOutline.circle.position()).toBeLessThan(n - 1);

      decorator.appendTo(svg);

      // did not change
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(decorator.parent).toBe(svg);

      // moved to the front
      // (this behavior is not firmly defined)
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });
  });

  describe('remove method', () => {
    test('when part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(decorator.parent).toBe(svg);

      decorator.remove();
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(decorator.parent)).toBeTruthy();
    });

    test('when not part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(decorator.parent)).toBeTruthy();

      decorator.remove();
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(decorator.parent)).toBeTruthy();
    });

    it('calls remove event listeners', () => {
      decorator.appendTo(svg);

      let listeners = [jest.fn(), jest.fn(), jest.fn()];
      circleBaseOutline.eventListeners['remove'].push(...listeners);

      listeners.forEach(listener => {
        expect(listener).toHaveBeenCalledTimes(0);
      });

      decorator.remove();

      listeners.forEach(listener => {
        expect(listener).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call remove event listeners when did not remove', () => {
      let listener = jest.fn();
      circleBaseOutline.eventListeners['remove'].push(listener);

      // no parent to be removed from
      expect(decorator.parent).toBeFalsy();

      decorator.remove();

      expect(listener).toHaveBeenCalledTimes(0);
    });
  });
});
