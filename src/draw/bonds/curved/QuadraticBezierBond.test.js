import { QuadraticBezierBond } from './QuadraticBezierBond';
import { isQuadraticBezierBond } from './QuadraticBezierBond';
import { NodeSVG } from 'Draw/svg/NodeSVG';
import { Base } from 'Draw/bases/Base';
import { uuidRegex } from 'Draw/svg/assignUuid';
import { positioning } from './positioning';
import { position } from './position';
import { round } from 'Math/round';

import { createStrungCircle } from 'Draw/bonds/strung/create';
import { createStrungTriangle } from 'Draw/bonds/strung/create';
import { createStrungRectangle } from 'Draw/bonds/strung/create';

import { curveOfBond } from 'Draw/bonds/strung/curveOfBond';
import { curveLengthOfBond } from 'Draw/bonds/strung/curveLengthOfBond';

import { addStrungElementToBond } from 'Draw/bonds/strung/addToBond';

function roundPositioning(p, places=3) {
  p.basePadding1 = round(p.basePadding1, places);
  p.basePadding2 = round(p.basePadding2, places);
  let cpd = p.controlPointDisplacement;
  cpd.magnitude = round(cpd.magnitude, places);
  cpd.angle = round(cpd.angle, places);
}

let container = null;
let svg = null;

let path = null;
let base1 = null;
let base2 = null;
let bond = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  svg = NodeSVG();
  svg.addTo(container);

  path = svg.path('M 10 20 Q 100 200 300 400');
  base1 = Base.create(svg, 'G', 200, 100);
  base2 = Base.create(svg, 'C', 20, 1000);
  bond = new QuadraticBezierBond(path, base1, base2);
});

afterEach(() => {
  path = null;
  base1 = null;
  base2 = null;
  bond = null;

  svg.clear();
  svg.remove();
  svg = null;

  container.remove();
  container = null;
});

describe('QuadraticBezierBond class', () => {
  describe('constructor', () => {
    it('stores references to path and bases 1 and 2', () => {
      let bond = new QuadraticBezierBond(path, base1, base2);
      expect(bond.path).toBe(path);
      expect(bond.base1).toBe(base1);
      expect(bond.base2).toBe(base2);
    });

    it.each([
      undefined,
      '',
    ])('initializes path ID if uninitialized', (v) => {
      let path = svg.path('M 20 30 Q 40 40 60 60');
      path.attr({ 'id': v });
      expect(path.attr('id')).toBe(v);
      let bond = new QuadraticBezierBond(path, base1, base2);
      // use the attr method to check if the ID was initialized
      // since the id method itself will initialize the ID
      expect(path.attr('id')).toMatch(uuidRegex);
    });

    it('does not overwrite path ID', () => {
      // it is important that IDs not be overwritten when opening
      // a saved drawing since elements in the drawing may
      // reference other elements using saved IDs (e.g., bonds
      // referencing their bases)
      path.id('previous-id');
      let bond = new QuadraticBezierBond(path, base1, base2);
      expect(path.id()).toBe('previous-id'); // didn't change
    });

    it('caches positioning', () => {
      let bond = new QuadraticBezierBond(path, base1, base2);
      let p1 = roundPositioning(positioning(bond), 3);
      bond.base1.recenter({ x: 50 * Math.random(), y: 1000 * Math.random() });
      bond.base2.recenter({ x: 500 * Math.random(), y: 200 * Math.random() });
      bond.reposition();
      let p2 = roundPositioning(positioning(bond), 3);
      expect(p2).toEqual(p1);
    });
  });

  it('id getter', () => {
    expect(bond.id).toBe(bond.path.id());
    expect(bond.id).toMatch(uuidRegex);
  });

  test('contains method', () => {
    let curve = curveOfBond(bond);
    let curveLength = curveLengthOfBond(bond);
    let strungCircle = createStrungCircle({ curve, curveLength });
    let strungTriangle = createStrungTriangle({ curve, curveLength });
    let strungRectangle = createStrungRectangle({ curve, curveLength });
    addStrungElementToBond({ bond, strungElement: strungCircle });
    addStrungElementToBond({ bond, strungElement: strungTriangle });
    // don't add the strung rectangle

    // contains method of nodes doesn't seem to work on Node.js
    expect(bond.contains(bond)).toBeTruthy();
    expect(bond.contains(bond.path)).toBeTruthy();
    expect(bond.contains(bond.path.node))//.toBeTruthy();

    // contains method of nodes doesn't seem to work on Node.js
    expect(bond.contains(strungCircle)).toBeTruthy();
    expect(bond.contains(strungCircle.circle)).toBeTruthy();
    expect(bond.contains(strungCircle.circle.node))//.toBeTruthy();
    expect(bond.contains(strungTriangle)).toBeTruthy();
    expect(bond.contains(strungTriangle.path)).toBeTruthy();
    expect(bond.contains(strungTriangle.path.node))//.toBeTruthy();
    expect(bond.contains(strungRectangle)).toBeFalsy();
    expect(bond.contains(strungRectangle.path)).toBeFalsy();
    expect(bond.contains(strungRectangle.path.node)).toBeFalsy();

    let path = svg.path('M 50 60 Q 0 0 100 200');
    expect(bond.contains(path)).toBeFalsy();
    expect(bond.contains(path.node)).toBeFalsy();
    let otherBond = new QuadraticBezierBond(path, base1, base2);
    expect(bond.contains(otherBond)).toBeFalsy();
  });

  it('binds method', () => {
    expect(bond.binds(bond.base1)).toBeTruthy();
    expect(bond.binds(bond.base2)).toBeTruthy();
    let base3 = Base.create(svg, 'T', 10, 100);
    expect(bond.binds(base3)).toBeFalsy();
  });

  describe.each([
    { name: 'basePadding1' },
    { name: 'basePadding2' },
  ])('$name property', ({ name }) => {
    it('repositions bond', () => {
      bond[name] = 60 * Math.random();
      let d1 = bond.path.attr('d');
      bond.reposition();
      let d2 = bond.path.attr('d');
      expect(d1).toBe(d2); // setter already repositioned the bond
    });

    it('caches value', () => {
      let v = 60 * Math.random();
      bond[name] = v;
      bond.base1.recenter({ x: 200 * Math.random(), y: 600 * Math.random() });
      bond.base2.recenter({ x: 400 * Math.random(), y: 250 * Math.random() });
      expect(bond[name]).toBeCloseTo(v); // gives cached value
    });
  });

  describe('control point displacement getter and setter methods', () => {
    test('repositioning the bond', () => {
      bond.setControlPointDisplacement({
        magnitude: 80 * Math.random(),
        angle: 10 * Math.random(),
      });
      let d1 = bond.path.attr('d');
      bond.reposition();
      let d2 = bond.path.attr('d');
      expect(d1).toBe(d2); // setter already repositioned the bond
    });

    test('caching the value', () => {
      let cpd = {
        magnitude: 100 * Math.random(),
        angle : 8 * Math.random(),
      };
      bond.setControlPointDisplacement(cpd);
      bond.base1.recenter({ x: 100 * Math.random(), y: 200 * Math.random() });
      bond.base2.recenter({ x: 500 * Math.random(), y: 400 * Math.random() });
      // gives cached value
      expect(bond.controlPointDisplacement()).toEqual(cpd);
    });
  });

  describe('reposition method', () => {
    it('repositions bond using cached positioning', () => {
      let bp1 = 40 * Math.random();
      let bp2 = 30 * Math.random();
      let cpd = {
        magnitude: 60 * Math.random(),
        angle: 16 * Math.random(),
      };
      bond.basePadding1 = bp1;
      bond.basePadding2 = bp2;
      bond.setControlPointDisplacement(cpd);
      bond.base1.recenter({ x: 500 * Math.random(), y: 500 * Math.random() });
      bond.base2.recenter({ x: 500 * Math.random(), y: 500 * Math.random() });
      // must use cached positioning since bases were moved
      bond.reposition();
      let d1 = bond.path.attr('d');
      position(bond, {
        basePadding1: bp1,
        basePadding2: bp2,
        controlPointDisplacement: cpd,
      });
      let d2 = bond.path.attr('d');
      expect(d1).toBe(d2);
    });
  });
});

test('isQuadraticBezierBond function', () => {
  expect(isQuadraticBezierBond(bond)).toBe(true);

  expect(isQuadraticBezierBond(base1)).toBe(false);
  expect(isQuadraticBezierBond(base2)).toBe(false);

  expect(isQuadraticBezierBond(undefined)).toBe(false);
  expect(isQuadraticBezierBond(null)).toBe(false);
  expect(isQuadraticBezierBond(1)).toBe(false);
  expect(isQuadraticBezierBond('QuadraticBezierBond')).toBe(false);
  expect(isQuadraticBezierBond(true)).toBe(false);
  expect(isQuadraticBezierBond({})).toBe(false);
});
