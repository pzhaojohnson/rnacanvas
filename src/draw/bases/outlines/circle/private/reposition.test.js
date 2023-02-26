import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutlineDecorator } from './reposition';

let svg = null;

let circleBaseOutline = null;
let decorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(10),
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
  describe('reposition method', () => {
    describe('when the base center is provided', () => {
      test('when there is a cached base center', () => {
        circleBaseOutline.circle.attr({ 'cx': 12, 'cy': 19 });
        circleBaseOutline.cachedBaseCenter = { x: 90, y: 80 };

        decorator.reposition(
          { baseCenter: { x: 210, y: 197 } },
        );

        expect(circleBaseOutline.circle.attr('cx')).toBeCloseTo(210);
        expect(circleBaseOutline.circle.attr('cy')).toBeCloseTo(197);

        expect(circleBaseOutline.cachedBaseCenter).toStrictEqual(
          { x: 210, y: 197 },
        );
      });

      test('when there is no cached base center', () => {
        circleBaseOutline.circle.attr({ 'cx': 45, 'cy': 6 });
        expect(circleBaseOutline.cachedBaseCenter).toBeFalsy();

        decorator.reposition(
          { baseCenter: { x: 65, y: 52 } },
        );

        expect(circleBaseOutline.circle.attr('cx')).toBeCloseTo(65);
        expect(circleBaseOutline.circle.attr('cy')).toBeCloseTo(52);

        expect(circleBaseOutline.cachedBaseCenter).toStrictEqual(
          { x: 65, y: 52 },
        );
      });
    });

    describe('when the base center is not provided', () => {
      test('when there is a cached base center', () => {
        circleBaseOutline.circle.attr({ 'cx': 48, 'cy': 99 });
        circleBaseOutline.cachedBaseCenter = { x: 23, y: 1008 };

        decorator.reposition();

        expect(circleBaseOutline.circle.attr('cx')).toBeCloseTo(23);
        expect(circleBaseOutline.circle.attr('cy')).toBeCloseTo(1008);

        expect(circleBaseOutline.cachedBaseCenter).toStrictEqual(
          { x: 23, y: 1008 },
        );
      });

      test('when there is no cached base center', () => {
        circleBaseOutline.circle.attr({ 'cx': 55.21, 'cy': 194.08 });
        expect(circleBaseOutline.cachedBaseCenter).toBeFalsy();

        decorator.reposition();

        expect(circleBaseOutline.circle.attr('cx')).toBeCloseTo(55.21);
        expect(circleBaseOutline.circle.attr('cy')).toBeCloseTo(194.08);

        expect(circleBaseOutline.cachedBaseCenter).toBeFalsy();
      });
    });

    it('calls move event listeners', () => {
      let listeners = [jest.fn(), jest.fn(), jest.fn()];
      circleBaseOutline.eventListeners['move'].push(...listeners);

      listeners.forEach(listener => {
        expect(listener).toHaveBeenCalledTimes(0);
      });

      decorator.reposition({ baseCenter: { x: 50, y: 560 } });

      listeners.forEach(listener => {
        expect(listener).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call move event listeners when did not move', () => {
      let listener = jest.fn();
      circleBaseOutline.eventListeners['move'].push(listener);

      expect(listener).toHaveBeenCalledTimes(0);

      expect(circleBaseOutline.cachedBaseCenter).toBeFalsy();
      decorator.reposition();

      expect(listener).toHaveBeenCalledTimes(0);
    });
  });
});
