import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutlineDecorator } from './contains';

let svg = null;

let circleBaseOutline = null;
let decorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(50),
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
  test('contains method', () => {
    let circle = circleBaseOutline.circle;
    expect(decorator.contains(circle)).toBe(true);
    expect(decorator.contains(circle.node)).toBe(true);

    circle = svg.circle(50);
    expect(decorator.contains(circle)).toBe(false);
    expect(decorator.contains(circle.node)).toBe(false);
  });
});
