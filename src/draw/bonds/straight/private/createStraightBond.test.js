/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { createBase } from 'Draw/bases/createBase';

import { uuidRegex } from 'Utilities/uuidRegex';

import { createStraightBond } from './createStraightBond';

let base1 = null;
let base2 = null;

beforeEach(() => {
  base1 = createBase('G');
  base2 = createBase('c');
});

afterEach(() => {
  base1 = null;
  base2 = null;
});

describe('createStraightBond function', () => {
  it('passes bases 1 and 2', () => {
    let sb = createStraightBond({ base1, base2 });
    expect(sb.base1).toBe(base1);
    expect(sb.base2).toBe(base2);

    expect(base1).toBeTruthy();
    expect(base2).toBeTruthy();
    expect(base1).not.toBe(base2);
  });

  /**
   * Straight bond line elements must have a unique ID for straight
   * bonds to be properly saved when saving a drawing.
   */
  it('initializes line ID with a UUID', () => {
    let sb = createStraightBond({ base1, base2 });
    let lineId = sb.line.attr('id');

    expect(lineId.length).toBeGreaterThanOrEqual(36);
    expect(lineId).toMatch(uuidRegex);
  });

  it('positions line', () => {
    base1.setCenter({ x: 1349.38, y: 181 });
    base2.setCenter({ x: 5849, y: 25 });

    let sb = createStraightBond({ base1, base2 });

    expect(sb.line.attr('x1')).toBeCloseTo(1349.38);
    expect(sb.line.attr('y1')).toBeCloseTo(181);
    expect(sb.line.attr('x2')).toBeCloseTo(5849);
    expect(sb.line.attr('y2')).toBeCloseTo(25);
  });
});
