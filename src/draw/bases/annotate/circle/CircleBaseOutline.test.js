import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutline } from './CircleBaseOutline';

let svg = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);
});

afterEach(() => {
  svg.remove();
  svg = null;
});

describe('CircleBaseOutline class', () => {
  test('constructor', () => {
    let circle = svg.circle(10);
    let baseCenter = { x: 32.8091, y: 1045.662 };

    let outline = new CircleBaseOutline(circle, baseCenter);

    // passed circle argument
    expect(outline.underlyingCircleBaseOutline.circle).toBe(circle);

    // passed base center argument
    expect(
      outline.underlyingCircleBaseOutline.cachedBaseCenter
    ).toStrictEqual({ x: 32.8091, y: 1045.662 });
  });
});
