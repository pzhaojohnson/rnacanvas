/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import { createBase } from 'Draw/bases/createBase';

import { createPrimaryBond } from 'Draw/bonds/straight/createPrimaryBond';

import { DrawingFragment } from './DrawingFragment';

let drawingFragment = null;

beforeEach(() => {
  drawingFragment = new DrawingFragment();
});

afterEach(() => {
  drawingFragment = null;
});

describe('DrawingFragment class', () => {
  describe('constructor', () => {
    it('initializes wrappee', () => {
      let drawingFragment = new DrawingFragment();
      expect(drawingFragment.wrappee).toBeInstanceOf(BasicDrawingFragment);
    });
  });

  test('primaryBonds getter and appendPrimaryBond method', () => {
    expect(drawingFragment.primaryBonds).toStrictEqual([]);

    let bases = [createBase('a'), createBase('G'), createBase('c')];

    let pb1 = createPrimaryBond({ base1: bases[0], base2: bases[1] });
    let pb2 = createPrimaryBond({ base1: bases[1], base2: bases[0] });
    let pb3 = createPrimaryBond({ base1: bases[0], base2: bases[2] });

    drawingFragment.appendPrimaryBond(pb1);
    expect(drawingFragment.primaryBonds).toStrictEqual([pb1]);

    drawingFragment.appendPrimaryBond(pb2);
    drawingFragment.appendPrimaryBond(pb3);
    expect(drawingFragment.primaryBonds).toStrictEqual([pb1, pb2, pb3]);
  });
});
