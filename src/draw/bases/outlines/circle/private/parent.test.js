import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { isNullish } from 'Values/isNullish';

import { CircleBaseOutlineDecorator } from './parent';

let svg = null;

let circleBaseOutline = null;
let circleBaseOutlineDecorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline();

  circleBaseOutlineDecorator = (
    new CircleBaseOutlineDecorator(circleBaseOutline)
  );
});

afterEach(() => {
  circleBaseOutlineDecorator = null;
  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutlineDecorator class', () => {
  describe('parent getter', () => {
    test('when part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(circleBaseOutlineDecorator.parent).toBe(svg);
    });

    test('when not part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(circleBaseOutlineDecorator.parent)).toBeTruthy();
    });
  });

  describe('appendTo method', () => {
    test('when not already part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(circleBaseOutlineDecorator.parent)).toBeTruthy();

      // add some elements to be behind or in front of
      svg.rect(50, 20);
      svg.text('zxcv');
      svg.circle(22);
      svg.text('Q');

      circleBaseOutlineDecorator.appendTo(svg);

      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(circleBaseOutlineDecorator.parent).toBe(svg);

      let n = svg.children().length;

      // should be at the end of the SVG document
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });

    test('when already part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(circleBaseOutlineDecorator.parent).toBe(svg);

      // add some elements to be behind or in front of
      svg.circle(20);
      svg.rect(10, 20);
      svg.text('A');
      svg.text('qwer');

      let n = svg.children().length;
      expect(circleBaseOutline.circle.position()).toBeLessThan(n - 1);

      circleBaseOutlineDecorator.appendTo(svg);

      // did not change
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(circleBaseOutlineDecorator.parent).toBe(svg);

      // moved to the front
      // (this behavior is not firmly defined)
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });
  });

  describe('remove method', () => {
    test('when part of an SVG document', () => {
      circleBaseOutline.circle.addTo(svg);
      expect(circleBaseOutline.circle.root()).toBe(svg);
      expect(circleBaseOutlineDecorator.parent).toBe(svg);

      circleBaseOutlineDecorator.remove();
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(circleBaseOutlineDecorator.parent)).toBeTruthy();
    });

    test('when not part of an SVG document', () => {
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(circleBaseOutlineDecorator.parent)).toBeTruthy();

      circleBaseOutlineDecorator.remove();
      expect(isNullish(circleBaseOutline.circle.root())).toBeTruthy();
      expect(isNullish(circleBaseOutlineDecorator.parent)).toBeTruthy();
    });
  });
});
