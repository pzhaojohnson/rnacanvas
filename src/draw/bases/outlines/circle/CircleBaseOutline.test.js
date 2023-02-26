/**
 * The private circle base outline class.
 */
import { CircleBaseOutline as _CircleBaseOutline } from './private/CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { Circle as SVGCircle } from '@svgdotjs/svg.js';

import { CircleBaseOutline } from './CircleBaseOutline';

let svg = null;

let circleBaseOutline = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(55),
    baseCenter: { x: 100, y: 200 },
  });
});

afterEach(() => {
  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutline class', () => {
  test('fromSaved static method', () => {
    // add extra elements to sift through
    svg.circle(23).back();
    svg.rect(2, 88).back();
    svg.ellipse(100, 10);
    svg.text('asdf');

    let saved = circleBaseOutline.toSaved();

    let circleBaseOutline2 = (
      CircleBaseOutline.fromSaved({ saved, parent: svg })
    );

    // returns an instance of the public circle base outline class
    expect(circleBaseOutline2).not.toBeInstanceOf(_CircleBaseOutline);
    expect(circleBaseOutline2).toBeInstanceOf(CircleBaseOutline);

    expect(circleBaseOutline2.circle).toBeInstanceOf(SVGCircle);
    expect(circleBaseOutline2.circle.attr('id')).toBe(saved.circleId);
    expect(circleBaseOutline2.circle.attr('id')).toBeTruthy();
  });

  describe('constructor', () => {
    test('passing circle and base center parameters', () => {
      let circle = svg.circle(20);
      let baseCenter = { x: 102.7782, y: 228.829 };

      let circleBaseOutline = new CircleBaseOutline({ circle, baseCenter });

      // passed circle argument
      expect(circleBaseOutline._wrappee.circle).toBe(circle);

      // passed base center argument
      expect(circleBaseOutline._wrappee.cachedBaseCenter)
        .toStrictEqual({ x: 102.7782, y: 228.829 });
    });

    test('passing a private circle base outline class instance', () => {
      let wrappee = new _CircleBaseOutline();
      let circleBaseOutline = new CircleBaseOutline(wrappee);
      expect(circleBaseOutline._wrappee).toBe(wrappee);
    });
  });

  test('circle getter', () => {
    expect(circleBaseOutline.circle)
      .toBe(circleBaseOutline._wrappee.circle);

    expect(circleBaseOutline.circle).toBeTruthy();
  });

  test('addEventListener method', () => {
    let listener = jest.fn();
    circleBaseOutline.addEventListener('move', listener);

    expect(listener).toHaveBeenCalledTimes(0);
    circleBaseOutline.reposition({ baseCenter: { x: 10, y: 20 } });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('parent getter', () => {
    expect(circleBaseOutline.circle.root()).toBe(svg);
    expect(circleBaseOutline.parent).toBe(svg);
  });

  test('appendTo and remove methods', () => {
    circleBaseOutline.remove();
    expect(circleBaseOutline.parent).toBeFalsy();
    expect(circleBaseOutline.circle.root()).toBeFalsy();

    circleBaseOutline.appendTo(svg);
    expect(circleBaseOutline.parent).toBe(svg);
    expect(circleBaseOutline.circle.root()).toBe(svg);

    circleBaseOutline.remove();
    expect(circleBaseOutline.parent).toBeFalsy();
    expect(circleBaseOutline.circle.root()).toBeFalsy();
  });

  test('contains method', () => {
    let circle = circleBaseOutline.circle;
    expect(circleBaseOutline.contains(circle)).toBe(true);
    expect(circleBaseOutline.contains(circle.node)).toBe(true);

    circle = svg.circle(20);
    expect(circleBaseOutline.contains(circle)).toBe(false);
    expect(circleBaseOutline.contains(circle.node)).toBe(false);
  });

  test('reposition method', () => {
    let baseCenter = { x: 1205.692, y: 2133.808 };
    circleBaseOutline.reposition({ baseCenter });
    expect(circleBaseOutline.circle.attr('cx')).toBeCloseTo(1205.692);
    expect(circleBaseOutline.circle.attr('cy')).toBeCloseTo(2133.808);
  });

  test('sendToBack and bringToFront methods', () => {
    // add other elements to be behind or in front of
    svg.text('A');
    svg.text('qwer');
    svg.circle(50);
    svg.rect(10, 10);

    let n = svg.children().length;

    circleBaseOutline.circle.back();

    circleBaseOutline.bringToFront();
    expect(circleBaseOutline.circle.position()).toBe(n - 1);

    circleBaseOutline.sendToBack();
    expect(circleBaseOutline.circle.position()).toBe(0);
  });

  test('toSaved method', () => {
    circleBaseOutline.circle.attr('id', 'zxcv-12345-kjy7egwh');
    let saved = circleBaseOutline.toSaved();

    expect(saved).toStrictEqual({
      className: 'CircleBaseOutline',
      circleId: 'zxcv-12345-kjy7egwh',
    });
  });
});
