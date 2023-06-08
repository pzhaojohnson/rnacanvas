/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './BasicDrawingFragment';

import { createBase } from 'Draw/bases/createBase';

import { createSecondaryBond } from 'Draw/bonds/straight/createSecondaryBond';

import { DrawingFragmentDecorator } from './appendSecondaryBond';

let decoratee = null;
let decorator = null;

beforeEach(() => {
  decoratee = new BasicDrawingFragment();
  decorator = new DrawingFragmentDecorator(decoratee);

  let bases = [
    createBase('a'),
    createBase('G'),
    createBase('c'),
    createBase('a'),
  ];

  let secondaryBonds = [
    createSecondaryBond({ base1: bases[0], base2: bases[2] }),
    createSecondaryBond({ base1: bases[1], base2: bases[3] }),
    createSecondaryBond({ base1: bases[0], base2: bases[2] }),
    createSecondaryBond({ base1: bases[0], base2: bases[3] }),
  ];

  // add secondary bonds to append after
  secondaryBonds.forEach(sb => decorator.appendSecondaryBond(sb));
});

afterEach(() => {
  decorator = null;
  decoratee = null;
});

describe('DrawingFragmentDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  describe('appendSecondaryBond method', () => {
    let secondaryBond = null;

    beforeEach(() => {
      secondaryBond = createSecondaryBond({
        base1: createBase('A'),
        base2: createBase('C'),
      });
    });

    afterEach(() => {
      secondaryBond = null;
    });

    it('appends secondary bond to secondary bonds array', () => {
      let n = decoratee.secondaryBonds.length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendSecondaryBond(secondaryBond);
      expect(decoratee.secondaryBonds[n]).toBe(secondaryBond);
    });

    it('appends SVG elements of secondary bond to SVG document', () => {
      expect(secondaryBond.line.root()).toBeFalsy();

      let n = decoratee.svg.children().length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendSecondaryBond(secondaryBond);
      expect(secondaryBond.line.root()).toBe(decoratee.svg);
      expect(decoratee.svg.children()[n]).toBe(secondaryBond.line);
    });
  });
});
