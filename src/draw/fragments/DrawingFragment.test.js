/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './private/BasicDrawingFragment';

import { createSequence } from 'Draw/sequences/createSequence';

import { createBase } from 'Draw/bases/createBase';

import { createPrimaryBond } from 'Draw/bonds/straight/createPrimaryBond';

import { createSecondaryBond } from 'Draw/bonds/straight/createSecondaryBond';

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

  test('sequences getter and appendSequence method', () => {
    expect(drawingFragment.sequences).toStrictEqual([]);

    let seq1 = createSequence('asdf');
    let seq2 = createSequence('');
    let seq3 = createSequence('asdf asdf w');

    drawingFragment.appendSequence(seq1);
    expect(drawingFragment.sequences).toStrictEqual([seq1]);

    drawingFragment.appendSequence(seq2);
    drawingFragment.appendSequence(seq3);
    expect(drawingFragment.sequences).toStrictEqual([seq1, seq2, seq3]);
  });

  test('bases getter', () => {
    expect(drawingFragment.sequences.length).toBe(0);

    drawingFragment.appendSequence(createSequence('asdf'));
    drawingFragment.appendSequence(createSequence('qwer'));
    drawingFragment.appendSequence(createSequence('soj sdvpi'));

    let bases = drawingFragment.bases;
    expect(bases.length).toBe(17);

    expect(
      bases.map(b => b.text.text()).join('')
    ).toBe('asdfqwersoj sdvpi');
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

  test('secondaryBonds getter and appendSecondaryBond method', () => {
    expect(drawingFragment.secondaryBonds).toStrictEqual([]);

    let bases = [createBase('R'), createBase('Y'), createBase('n')];

    let sb1 = createSecondaryBond({ base1: bases[0], base2: bases[1] });
    let sb2 = createSecondaryBond({ base1: bases[2], base2: bases[0] });
    let sb3 = createSecondaryBond({ base1: bases[1], base2: bases[2] });

    drawingFragment.appendSecondaryBond(sb1);
    expect(drawingFragment.secondaryBonds).toStrictEqual([sb1]);

    drawingFragment.appendSecondaryBond(sb2);
    drawingFragment.appendSecondaryBond(sb3);
    expect(drawingFragment.secondaryBonds).toStrictEqual([sb1, sb2, sb3]);
  });
});
