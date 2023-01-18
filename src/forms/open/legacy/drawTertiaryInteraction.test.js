import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { parseDotBracket } from 'Parse/parseDotBracket';

import { DrawingWrapper } from './drawTertiaryInteraction';

class SequenceWrapper {
  constructor(sequence) {
    this.sequence = sequence;
  }

  /**
   * Given a position pair tuple, returns a base-pair tuple.
   */
  getBasePair(positionPair) {
    let b1 = this.sequence.getBaseAtPosition(positionPair[0]);
    let b2 = this.sequence.getBaseAtPosition(positionPair[1]);

    if (!b1 || !b2) {
      throw new Error('Unable to retrieve base-pair.');
    }

    return [b1, b2];
  }
}

class TertiaryBondWrapper {
  constructor(tertiaryBond) {
    this.tertiaryBond = tertiaryBond;
  }

  bindsBoth(basePair) {
    let [base1, base2] = basePair;

    return (
      this.tertiaryBond.binds(base1)
      && this.tertiaryBond.binds(base2)
    );
  }
}

function wrapTertiaryBond(tertiaryBond) {
  return new TertiaryBondWrapper(tertiaryBond);
}

let app = null;

let drawing = null;
let drawingWrapper = null;

let parentSequence = null;
let parentSequenceWrapper = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  drawing = app.drawing;

  drawing.appendStructure({
    id: 'Structure 1',
    characters: 'AAUUGCACGUCGACUGCUUCGACU',
    secondaryPartners: (
      parseDotBracket('...(((...)))...((....)).').secondaryPartners
    ),
  });

  drawingWrapper = new DrawingWrapper(drawing);

  parentSequence = drawing.sequences[0];
  parentSequenceWrapper = new SequenceWrapper(parentSequence);
});

afterEach(() => {
  parentSequenceWrapper = null;
  parentSequence = null;

  drawingWrapper = null;
  drawing = null;

  app.remove();
  app = null;
});

describe('DrawingWrapper class', () => {
  test('drawing property', () => {
    let drawingWrapper = new DrawingWrapper(app.drawing);
    expect(drawingWrapper.drawing).toBe(app.drawing);
  });

  describe('drawTertiaryInteraction method', () => {
    test('side lengths of one', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 5, end: 5 },
        side2: { parentSequence, start: 9, end: 9 },
      });

      expect(drawing.tertiaryBonds.length).toBe(1);
      let tertiaryBonds = drawing.tertiaryBonds.map(wrapTertiaryBond);

      [[5, 9]].forEach(pair => {
        let basePair = parentSequenceWrapper.getBasePair(pair);
        let tb = tertiaryBonds.find(tb => tb.bindsBoth(basePair));
        expect(tb).toBeTruthy();
      });
    });

    test('side lengths of three', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 19, end: 21 },
        side2: { parentSequence, start: 11, end: 13 },
      });

      expect(drawing.tertiaryBonds.length).toBe(3);
      let tertiaryBonds = drawing.tertiaryBonds.map(wrapTertiaryBond);

      [[19, 13], [20, 12], [21, 11]].forEach(pair => {
        let basePair = parentSequenceWrapper.getBasePair(pair);
        let tb = tertiaryBonds.find(tb => tb.bindsBoth(basePair));
        expect(tb).toBeTruthy();
      });
    });

    test('when side 1 is shorter', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 20, end: 21 },
        side2: { parentSequence, start: 5, end: 9 },
      });

      expect(drawing.tertiaryBonds.length).toBe(2);
      let tertiaryBonds = drawing.tertiaryBonds.map(wrapTertiaryBond);

      // the pairs produced by the current implementation
      // (does not fully pair up side 2)
      [[20, 9], [21, 8]].forEach(pair => {
        let basePair = parentSequenceWrapper.getBasePair(pair);
        let tb = tertiaryBonds.find(tb => tb.bindsBoth(basePair));
        expect(tb).toBeTruthy();
      });
    });

    test('when side 2 is shorter', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 3, end: 6 },
        side2: { parentSequence, start: 15, end: 16 },
      });

      expect(drawing.tertiaryBonds.length).toBe(4);
      let tertiaryBonds = drawing.tertiaryBonds.map(wrapTertiaryBond);

      // the pairs produced by the current implementation
      [[3, 16], [4, 15], [5, 15], [6, 15]].forEach(pair => {
        let basePair = parentSequenceWrapper.getBasePair(pair);
        let tb = tertiaryBonds.find(tb => tb.bindsBoth(basePair));
        expect(tb).toBeTruthy();
      });
    });

    test('overlapping sides', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 15, end: 17 },
        side2: { parentSequence, start: 15, end: 17 },
      });

      expect(drawing.tertiaryBonds.length).toBe(3);
      let tertiaryBonds = drawing.tertiaryBonds.map(wrapTertiaryBond);

      [[15, 17], [16, 16], [17, 15]].forEach(pair => {
        let basePair = parentSequenceWrapper.getBasePair(pair);
        let tb = tertiaryBonds.find(tb => tb.bindsBoth(basePair));
        expect(tb).toBeTruthy();
      });
    });

    test('when color is specified', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 6, end: 8 },
        side2: { parentSequence, start: 20, end: 22 },
        color: new SVGColor('#bbcc38'),
      });

      expect(drawing.tertiaryBonds.length).toBe(3);

      drawing.tertiaryBonds.forEach(tb => {
        expect(tb.path.attr('stroke')).toBe('#bbcc38');
      });
    });

    test('when color is not specified', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 18, end: 19 },
        side2: { parentSequence, start: 11, end: 12 },
      });

      expect(drawing.tertiaryBonds.length).toBe(2);

      drawing.tertiaryBonds.forEach(tb => {
        // the default color
        expect(tb.path.attr('stroke')).toBe('#8cd4e8');
      });
    });

    it('adds tertiary bonds with nonzero stroke width and opacities', () => {
      drawingWrapper.drawTertiaryInteraction({
        side1: { parentSequence, start: 2, end: 4 },
        side2: { parentSequence, start: 10, end: 12 },
      });

      expect(drawing.tertiaryBonds.length).toBe(3);

      drawing.tertiaryBonds.forEach(tb => {
        expect(tb.path.attr('stroke-width')).toBe(1);
        expect(tb.path.attr('stroke-opacity')).toBe(1);
        expect(tb.path.attr('opacity')).toBe(1);
      });
    });
  });
});
