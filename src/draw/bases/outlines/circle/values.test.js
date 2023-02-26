import { values, setValues } from './values';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { CircleBaseOutline as CircleBaseAnnotation } from './CircleBaseOutline';

let container = null;
let svg = null;
let cba = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  let circle = svg.circle(50);
  circle.attr({ 'cx': 50, 'cy': 100 });
  cba = new CircleBaseAnnotation({ circle, baseCenter: { x: 50, y: 100 } });
});

afterEach(() => {
  cba = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('values function', () => {
  it('returns values', () => {
    // make all values different to test if values are mixed up
    cba.circle.attr({
      'r': 26.6,
      'stroke': '#ffab12',
      'stroke-width': 12.9,
      'stroke-opacity': 0.84,
      'fill': '#fabb33',
      'fill-opacity': 0.17,
    });
    let vs = values(cba);
    expect(vs).toEqual({
      circle: {
        'r': 26.6,
        'stroke': '#ffab12',
        'stroke-width': 12.9,
        'stroke-opacity': 0.84,
        'fill': '#fabb33',
        'fill-opacity': 0.17,
      },
    });
  });
});

describe('setValues function', () => {
  it('sets values', () => {
    // make all values different to test if values are mixed up
    let vs1 = {
      circle: {
        'r': 48.1,
        'stroke': '#123321',
        'stroke-width': 8.57,
        'stroke-opacity': 0.34,
        'fill': '#33bda2',
        'fill-opacity': 0.279,
      },
    };
    setValues(cba, vs1);
    let vs2 = values(cba);
    expect(vs2).toEqual(vs1);
  });

  it('handles falsy values', () => {
    let vs1 = {
      circle: {
        'r': 32.2,
        'stroke': '#654cba',
        'stroke-width': 2.6,
        'stroke-opacity': 0.55,
        'fill': '#bda221',
        'fill-opacity': 0.08,
      },
    };
    setValues(cba, vs1);
    // with a defined circle values object
    setValues(cba, { circle: {} });
    // with an undefined circle values object
    setValues(cba, {});
    let vs2 = values(cba);
    // didn't set anything to undefined
    expect(vs2).toEqual(vs1);
  });
});
