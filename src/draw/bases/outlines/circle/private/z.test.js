import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutlineDecorator } from './z';

let svg = null;

let circleBaseOutline = null;
let decorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  // add some other elements to be behind or in front of
  svg.rect(10, 20);
  svg.path('M 1 2 Q 100 200 500 50');
  svg.circle(50);
  svg.text('A');
  svg.text('asdf');

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(20),
  });

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
  describe('sendToBack method', () => {
    test('when not already at the back', () => {
      circleBaseOutline.circle.front();
      circleBaseOutline.circle.backward();
      expect(circleBaseOutline.circle.position()).toBeGreaterThan(0);

      decorator.sendToBack();
      expect(circleBaseOutline.circle.position()).toBe(0);
    });

    test('when already at the back', () => {
      circleBaseOutline.circle.back();
      expect(circleBaseOutline.circle.position()).toBe(0);

      decorator.sendToBack();
      expect(circleBaseOutline.circle.position()).toBe(0);
    });
  });

  describe('bringToFront method', () => {
    test('when not already at the front', () => {
      let n = svg.children().length;

      circleBaseOutline.circle.back();
      circleBaseOutline.circle.forward();
      expect(circleBaseOutline.circle.position()).toBeLessThan(n - 1);

      decorator.bringToFront();
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });

    test('when already at the front', () => {
      let n = svg.children().length;

      circleBaseOutline.circle.front();
      expect(circleBaseOutline.circle.position()).toBe(n - 1);

      decorator.bringToFront();
      expect(circleBaseOutline.circle.position()).toBe(n - 1);
    });
  });
});
