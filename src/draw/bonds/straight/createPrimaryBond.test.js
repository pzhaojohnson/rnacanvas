/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { createBase } from 'Draw/bases/createBase';

import { uuidRegex } from 'Utilities/uuidRegex';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { createPrimaryBond } from './createPrimaryBond';

let base1 = null;
let base2 = null;

beforeEach(() => {
  base1 = createBase('G');
  base2 = createBase('A');
});

afterEach(() => {
  base1 = null;
  base2 = null;
});

describe('createPrimaryBond function', () => {
  it('passes bases 1 and 2', () => {
    let pb = createPrimaryBond({ base1, base2 });
    expect(pb.base1).toBe(base1);
    expect(pb.base2).toBe(base2);

    expect(base1).toBeTruthy();
    expect(base2).toBeTruthy();
    expect(base1).not.toBe(base2);
  });

  it('initializes line ID with a UUID', () => {
    let pb = createPrimaryBond({ base1, base2 });
    let lineId = pb.line.attr('id');

    expect(lineId.length).toBeGreaterThanOrEqual(36);
    expect(lineId).toMatch(uuidRegex);
  });

  it('applies default values', () => {
    let pb = createPrimaryBond({ base1, base2 });

    // just check some line attributes
    let stroke = new SVGColor(pb.line.attr('stroke'));
    expect(stroke.toHex()).toBe('#515151');
  });

  it('positions line', () => {
    base1.setCenter({ x: 1487, y: 98234 });
    base2.setCenter({ x: 2387, y: 52000 });

    let pb = createPrimaryBond({ base1, base2 });

    let x1 = pb.line.attr('x1');
    let y1 = pb.line.attr('y1');
    let x2 = pb.line.attr('x2');
    let y2 = pb.line.attr('y2');

    // should not move if was already positioned
    pb.reposition();
    expect(pb.line.attr('x1')).toBeCloseTo(x1);
    expect(pb.line.attr('y1')).toBeCloseTo(y1);
    expect(pb.line.attr('x2')).toBeCloseTo(x2);
    expect(pb.line.attr('y2')).toBeCloseTo(y2);

    expect(x1).not.toBeCloseTo(0);
    expect(y1).not.toBeCloseTo(0);
    expect(x2).not.toBeCloseTo(0);
    expect(y2).not.toBeCloseTo(0);
  });
});
