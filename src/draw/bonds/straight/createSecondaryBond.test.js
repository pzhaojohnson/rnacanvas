/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { createBase } from 'Draw/bases/createBase';

import { uuidRegex } from 'Utilities/uuidRegex';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { createSecondaryBond } from './createSecondaryBond';

let base1 = null;
let base2 = null;

beforeEach(() => {
  base1 = createBase('A');
  base2 = createBase('Y');
});

afterEach(() => {
  base1 = null;
  base2 = null;
});

describe('createSecondaryBond function', () => {
  it('passes bases 1 and 2', () => {
    let sb = createSecondaryBond({ base1, base2 });
    expect(sb.base1).toBe(base1);
    expect(sb.base2).toBe(base2);

    expect(base1).not.toBe(base2);
    expect(base1).toBeTruthy();
    expect(base2).toBeTruthy();
  });

  it('initializes line ID with a UUID', () => {
    let sb = createSecondaryBond({ base1, base2 });
    let lineId = sb.line.attr('id');

    expect(lineId.length).toBeGreaterThanOrEqual(36);
    expect(lineId).toMatch(uuidRegex);
  });

  it('positions line', () => {
    base1.setCenter({ x: 55, y: 204 });
    base2.setCenter({ x: 55, y: 884 });

    let sb = createSecondaryBond({ base1, base2 });

    expect(sb.line.attr('x1')).toBeCloseTo(55);
    expect(sb.line.attr('y1')).toBeCloseTo(209.5);
    expect(sb.line.attr('x2')).toBeCloseTo(55);
    expect(sb.line.attr('y2')).toBeCloseTo(878.5);
  });

  describe('applying default values', () => {
    test('a GC bond', () => {
      base1.text.text('C');
      base2.text.text('G');
      let sb = createSecondaryBond({ base1, base2 });
      expect(sb.type.toUpperCase()).toBe('GC');

      // just check some values
      // (expected values are hard-coded and might become outdated)
      let stroke = new SVGColor(sb.line.attr('stroke'));
      expect(stroke.toHex()).toBe('#000000');
      expect(sb.line.attr('stroke-width')).toBe(2);
      expect(sb.basePadding1).toBeCloseTo(5.5);
      expect(sb.basePadding2).toBeCloseTo(5.5);
    });

    test('an AU bond', () => {
      base1.text.text('A');
      base2.text.text('u');
      let sb = createSecondaryBond({ base1, base2 });
      expect(sb.type.toUpperCase()).toBe('AUT');

      // just check some values
      // (expected values are hard-coded and might become outdated)
      let stroke = new SVGColor(sb.line.attr('stroke'));
      expect(stroke.toHex()).toBe('#000000');
      expect(sb.line.attr('stroke-width')).toBe(2);
      expect(sb.basePadding1).toBeCloseTo(5.5);
      expect(sb.basePadding2).toBeCloseTo(5.5);
    });
  });
});
