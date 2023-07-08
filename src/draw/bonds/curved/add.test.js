import { addTertiaryBond } from './add';
import Drawing from 'Draw/Drawing';
import { NodeSVG } from 'Draw/svg/NodeSVG';

let container = null;
let drawing = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  drawing.appendTo(container);

  // test with multiple sequences
  drawing.appendSequence('asdf', 'asdfqwerzxcv');
  drawing.appendSequence('qwer', 'qwerasdfzxcv');
});

afterEach(() => {
  drawing.clear();
  drawing = null;

  container.remove();
  container = null;
});

describe('addTertiaryBond function', () => {
  it('creates bond with given bases 1 and 2', () => {
    expect(drawing.bases().length).toBeGreaterThanOrEqual(24);
    let base1 = drawing.bases()[5];
    let base2 = drawing.bases()[10];
    let tb = addTertiaryBond(drawing, base1, base2);
    expect(tb.base1).toBe(base1);
    expect(tb.base2).toBe(base2);
    // double-check that bases are defined
    expect(base1).toBeTruthy();
    expect(base2).toBeTruthy();
  });

  it('adds bond to tertiary bonds array', () => {
    expect(drawing.bases().length).toBeGreaterThanOrEqual(24);
    [
      [2, 8],
      [12, 7],
      [16, 18],
    ].forEach(bis => {
      let base1 = drawing.bases()[bis[0]];
      let base2 = drawing.bases()[bis[1]];
      let tb = addTertiaryBond(drawing, base1, base2);
      expect(drawing.tertiaryBonds.includes(tb)).toBeTruthy();
    });
  });

  it('positions the added bond', () => {
    expect(drawing.bases().length).toBeGreaterThanOrEqual(24);
    let base1 = drawing.bases()[7];
    let base2 = drawing.bases()[10];
    base1.recenter({ x: 200 * Math.random(), y: 500 * Math.random() });
    base2.recenter({ x: 300 * Math.random(), y: 100 * Math.random() });
    let tb = addTertiaryBond(drawing, base1, base2);
    let d1 = tb.path.attr('d');
    tb.reposition();
    let d2 = tb.path.attr('d');

    // should be the same if the tertiary bond was already positioned
    expect(d1).toBe(d2);

    expect(d1).toBeTruthy();
  });
});
