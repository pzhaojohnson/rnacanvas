import { addPrimaryBond, addSecondaryBond } from './add';
import Drawing from 'Draw/Drawing';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { round } from 'Math/round';

function getRoundedPositioning(bond, places=3) {
  return {
    line: {
      'x1': round(bond.line.attr('x1'), places),
      'y1': round(bond.line.attr('y1'), places),
      'x2': round(bond.line.attr('x2'), places),
      'y2': round(bond.line.attr('y2'), places),
    },
  };
}

let container = null;
let drawing = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  drawing = new Drawing({ SVG: { SVG: NodeSVG } });
  drawing.appendTo(container);

  // test with multiple sequences
  drawing.appendSequence('asdf', 'asdfasdf');
  drawing.appendSequence('qwer', 'qwer');
  drawing.appendSequence('zxcv', 'zxcvzx');
});

afterEach(() => {
  drawing.clear();
  drawing = null;

  container.remove();
  container = null;
});

describe('addPrimaryBond function', () => {
  it('creates bond with given bases 1 and 2', () => {
    let base1 = drawing.bases()[2];
    let base2 = drawing.bases()[9];
    let pb = addPrimaryBond(drawing, base1, base2);
    expect(pb.base1).toBe(base1);
    expect(pb.base2).toBe(base2);
  });

  it('adds primary bond to drawing SVG document', () => {
    let base1 = drawing.bases()[0];
    let base2 = drawing.bases()[1];
    let pb = addPrimaryBond(drawing, base1, base2);
    expect(pb.line.root()).toBe(drawing.svg);
    expect(pb.line.root()).toBeTruthy();
  });

  it('adds to primary bonds array', () => {
    for (let i = 0; i < 5; i++) {
      let bases = drawing.bases();
      let pb = addPrimaryBond(drawing, bases[i], bases[i + 1]);
      expect(drawing.primaryBonds.includes(pb)).toBeTruthy();
    }
  });

  it('positions the added bond', () => {
    let base1 = drawing.bases()[3];
    let base2 = drawing.bases()[4];
    base1.recenter({ x: 200, y: 10 });
    base2.recenter({ x: 50, y: 300 });
    let pb = addPrimaryBond(drawing, base1, base2);
    let rp1 = getRoundedPositioning(pb);
    pb.reposition();
    let rp2 = getRoundedPositioning(pb);
    expect(rp1).toEqual(rp2); // positioned bond
  });
});

describe('addSecondaryBond function', () => {
  it('creates bond with given bases 1 and 2', () => {
    let base1 = drawing.bases()[8];
    let base2 = drawing.bases()[4];
    let sb = addSecondaryBond(drawing, base1, base2);
    expect(sb.base1).toBe(base1);
    expect(sb.base2).toBe(base2);
  });

  it('adds secondary bond to drawing SVG document', () => {
    let base1 = drawing.bases()[2];
    let base2 = drawing.bases()[5];
    let sb = addSecondaryBond(drawing, base1, base2);
    expect(sb.line.root()).toBe(drawing.svg);
    expect(sb.line.root()).toBeTruthy();
  });

  it('adds to secondary bonds array', () => {
    for (let i = 0; i < 5; i++) {
      let bases = drawing.bases();
      let sb = addSecondaryBond(drawing, bases[i], bases[12 - i]);
      expect(drawing.secondaryBonds.includes(sb)).toBeTruthy();
    }
  });

  it('positions the added bond', () => {
    let base1 = drawing.bases()[2];
    let base2 = drawing.bases()[7];
    base1.recenter({ x: 30, y: 80 });
    base2.recenter({ x: 1000, y: 2000 });
    let sb = addSecondaryBond(drawing, base1, base2);
    let rp1 = getRoundedPositioning(sb);
    sb.reposition();
    let rp2 = getRoundedPositioning(sb);
    expect(rp1).toEqual(rp2); // positioned bond
  });
});
