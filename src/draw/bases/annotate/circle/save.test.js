import { savableState } from './save';
import { NodeSVG } from 'Draw/NodeSVG';
import { CircleBaseAnnotation } from './CircleBaseAnnotation';
import { uuidRegex } from 'Draw/svg/id';

let container = null;
let svg = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);
});

afterEach(() => {
  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('savableState function', () => {
  it('returns savable state', () => {
    let c = svg.circle(60);
    let cba = new CircleBaseAnnotation(c, 200, 300);
    let saved = savableState(cba);
    expect(saved).toEqual({
      className: 'CircleBaseAnnotation',
      circleId: c.id(),
    });
    expect(c.id()).toBeTruthy();
    expect(c.id()).toMatch(uuidRegex);
  });

  it('returned savable state can be converted to and from JSON', () => {
    let c = svg.circle(100);
    let cba = new CircleBaseAnnotation(c, 50, 100);
    let saved1 = savableState(cba);
    let string1 = JSON.stringify(saved1);
    let saved2 = JSON.parse(string1);
    expect(saved2).toEqual(saved1);
  });
});
