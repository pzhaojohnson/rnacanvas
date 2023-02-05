import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { CircleBaseOutlineDecorator } from './contains';

let svg = null;

let circleBaseOutline = null;
let circleBaseOutlineDecorator = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  circleBaseOutline = new CircleBaseOutline({
    circle: svg.circle(50),
  });

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
  test('contains method', () => {
    let circle = circleBaseOutline.circle;
    expect(circleBaseOutlineDecorator.contains(circle)).toBe(true);
    expect(circleBaseOutlineDecorator.contains(circle.node)).toBe(true);

    circle = svg.circle(50);
    expect(circleBaseOutlineDecorator.contains(circle)).toBe(false);
    expect(circleBaseOutlineDecorator.contains(circle.node)).toBe(false);
  });
});
