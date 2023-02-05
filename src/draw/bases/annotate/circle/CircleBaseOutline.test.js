import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutline } from './CircleBaseOutline';

let svg = null;

let circleBaseOutline = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline(
    svg.circle(55),
    { x: 100, y: 200 },
  );
});

afterEach(() => {
  circleBaseOutline = null;

  svg.remove();
  svg = null;
});

describe('CircleBaseOutline class', () => {
  test('constructor', () => {
    let circle = svg.circle(10);
    let baseCenter = { x: 32.8091, y: 1045.662 };

    let circleBaseOutline = new CircleBaseOutline(circle, baseCenter);

    // passed circle argument
    expect(circleBaseOutline.underlyingCircleBaseOutline.circle)
      .toBe(circle);

    // passed base center argument
    expect(circleBaseOutline.underlyingCircleBaseOutline.cachedBaseCenter)
      .toStrictEqual({ x: 32.8091, y: 1045.662 });
  });

  test('circle getter', () => {
    expect(circleBaseOutline.circle)
      .toBe(circleBaseOutline.underlyingCircleBaseOutline.circle);

    expect(circleBaseOutline.circle).toBeTruthy();
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
});
