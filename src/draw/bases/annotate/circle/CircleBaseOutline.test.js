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
});
