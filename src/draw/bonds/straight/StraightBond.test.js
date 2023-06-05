import { StraightBond } from './StraightBond';
import { isStraightBond } from './StraightBond';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';
import { uuidRegex } from 'Draw/svg/assignUuid';
import { round } from 'Math/round';
import { position } from './position';

import { createStrungText } from 'Draw/bonds/strung/create';
import { createStrungRectangle } from 'Draw/bonds/strung/create';
import { createStrungCircle } from 'Draw/bonds/strung/create';

import { curveOfBond } from 'Draw/bonds/strung/curveOfBond';
import { curveLengthOfBond } from 'Draw/bonds/strung/curveLengthOfBond';

import { addStrungElementToBond } from 'Draw/bonds/strung/addToBond';

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
let svg = null;

let line = null;
let base1 = null;
let base2 = null;
let bond = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  line = svg.line(35, 55, 250, 55);
  base1 = Base.create(svg, 'G', 20, 55);
  base2 = Base.create(svg, 'U', 270, 55);
  bond = new StraightBond(line, base1, base2);
});

afterEach(() => {
  line = null;
  base1 = null;
  base2 = null;
  bond = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('StraightBond class', () => {
  describe('constructor', () => {
    it('checks element type', () => {
      let rect = svg.rect(50, 60);
      expect(
        () => new StraightBond(rect, base1, base2)
      ).toThrow();
    });

    it('stores references to line and bases 1 and 2', () => {
      let bond = new StraightBond(line, base1, base2);
      expect(bond.line).toBe(line);
      expect(bond.base1).toBe(base1);
      expect(bond.base2).toBe(base2);
    });

    it('initializes line ID with a UUID', () => {
      [undefined, ''].forEach(v => {
        let line = svg.line(10, 20, 30, 40);
        line.attr({ 'id': v });
        // use the attr method to check the value of the ID
        // since the id method itself will initialize an ID
        expect(line.attr('id')).toBe(v);
        let bond = new StraightBond(line, base1, base2);
        // assigned a UUID
        expect(line.attr('id')).toMatch(uuidRegex);
      });
    });

    it('does not overwrite line ID', () => {
      // it is important not to overwrite IDs when opening
      // a saved drawing since elements in the drawing may
      // reference other elements using saved IDs (e.g.,
      // bonds referencing their bases)
      line.id('a-predefined-id');
      let bond = new StraightBond(line, base1, base2);
      expect(line.id()).toBe('a-predefined-id');
    });

    it('caches base paddings 1 and 2', () => {
      line.attr({ 'x1': 10, 'y1': 20, 'x2': 100, 'y2': 20 });
      base1.recenter({ x: 2, y: 20 }); // base padding 1 will be 8
      base2.recenter({ x: 112, y: 20 }); // base padding 2 will be 12
      let bond = new StraightBond(line, base1, base2);
      base1.recenter({ x: 23, y: 400 });
      base2.recenter({ x: 1012, y: 323 });
      bond.reposition(); // must use cached base paddings 1 and 2
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: 8, basePadding2: 12 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // used cached base paddings 1 and 2
    });
  });

  it('id getter', () => {
    // returns line ID
    expect(bond.id).toBe(bond.line.id());
    // double-check that ID is defined
    expect(bond.id).toBeTruthy();
  });

  test('appendTo and remove methods', () => {
    let sb = bond;
    sb.remove();
    expect(sb.line.root()).toBeFalsy();

    let n = svg.children().length;
    expect(n).toBeGreaterThanOrEqual(2);

    sb.appendTo(svg);
    expect(svg.children()[n]).toBe(sb.line);

    sb.remove();
    expect(sb.line.root()).toBeFalsy();
  });

  test('contains method', () => {
    let curve = curveOfBond(bond);
    let curveLength = curveLengthOfBond(bond);
    let strungText = createStrungText({ text: 'W', curve, curveLength });
    let strungRectangle = createStrungRectangle({ curve, curveLength });
    let strungCircle = createStrungCircle({ curve, curveLength });
    addStrungElementToBond({ bond, strungElement: strungText });
    addStrungElementToBond({ bond, strungElement: strungRectangle });
    // don't add the strung circle

    // contains method of nodes doesn't seem to work on Node.js
    expect(bond.contains(bond)).toBeTruthy();
    expect(bond.contains(bond.line)).toBeTruthy();
    expect(bond.contains(bond.line.node))//.toBeTruthy();

    // contains method of nodes doesn't seem to work on Node.js
    expect(bond.contains(strungText)).toBeTruthy();
    expect(bond.contains(strungText.text)).toBeTruthy();
    expect(bond.contains(strungText.text.node))//.toBeTruthy();
    expect(bond.contains(strungRectangle)).toBeTruthy();
    expect(bond.contains(strungRectangle.path)).toBeTruthy();
    expect(bond.contains(strungRectangle.path.node))//.toBeTruthy();
    expect(bond.contains(strungCircle)).toBeFalsy();
    expect(bond.contains(strungCircle.circle)).toBeFalsy();
    expect(bond.contains(strungCircle.circle.node)).toBeFalsy();

    let line = svg.line(1, 20, 300, 4000);
    expect(bond.contains(line)).toBeFalsy();
    expect(bond.contains(line.node)).toBeFalsy();
    let otherBond = new StraightBond(line, base1, base2);
    expect(bond.contains(otherBond)).toBeFalsy();
  });

  it('binds method', () => {
    expect(bond.binds(bond.base1)).toBeTruthy();
    expect(bond.binds(bond.base2)).toBeTruthy();
    let base3 = Base.create(svg, 'T', 20, 80);
    expect(bond.binds(base3)).toBeFalsy();
  });

  describe('basePadding1 property', () => {
    it('positions bond', () => {
      let bp1 = bond.basePadding1 + 12;
      bond.basePadding1 = bp1;
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: bp1, basePadding2: bond.basePadding2 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // positioned line
    });

    it('caches value', () => {
      let bp1 = bond.basePadding1 + 20;
      bond.basePadding1 = bp1;
      bond.base1.recenter({ x: bond.base1.xCenter + 70, y: bond.base1.yCenter + 80 });
      expect(bond.basePadding1).toBeCloseTo(bp1); // gives cached value
      bond.reposition(); // must use cached value
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: bp1, basePadding2: bond.basePadding2 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // used cached value
    });
  });

  describe('basePadding2 property', () => {
    it('positions bond', () => {
      let bp2 = bond.basePadding2 + 8.5;
      bond.basePadding2 = bp2;
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: bond.basePadding1, basePadding2: bp2 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // positioned bond
    });

    it('caches value', () => {
      let bp2 = bond.basePadding2 + 6;
      bond.basePadding2 = bp2;
      bond.base2.recenter({ x: bond.base2.xCenter - 300, y: bond.base2.yCenter + 500 });
      expect(bond.basePadding2).toBeCloseTo(bp2); // gives cached value
      bond.reposition(); // must use cached value
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: bond.basePadding1, basePadding2: bp2 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // used cached value
    });
  });

  describe('reposition method', () => {
    it('positions bond using cached base paddings 1 and 2', () => {
      bond.basePadding1 = 16.6;
      bond.basePadding2 = 29.4;
      bond.base1.recenter({ x: bond.base1.xCenter + 356, y: bond.base1.yCenter + 700 });
      bond.base2.recenter({ x: bond.base2.xCenter + 1000, y: bond.base2.yCenter + 812 });
      bond.reposition(); // must use cached base paddings 1 and 2
      let rp1 = getRoundedPositioning(bond);
      position(bond, { basePadding1: 16.6, basePadding2: 29.4 });
      let rp2 = getRoundedPositioning(bond);
      expect(rp1).toEqual(rp2); // used cached base paddings 1 and 2
    });
  });
});

test('isStraightBond function', () => {
  expect(isStraightBond(bond)).toBe(true);

  expect(isStraightBond(base1)).toBe(false);
  expect(isStraightBond(base2)).toBe(false);

  expect(isStraightBond(undefined)).toBe(false);
  expect(isStraightBond(null)).toBe(false);
  expect(isStraightBond(1)).toBe(false);
  expect(isStraightBond('StraightBond')).toBe(false);
  expect(isStraightBond(true)).toBe(false);
  expect(isStraightBond({})).toBe(false);
});
