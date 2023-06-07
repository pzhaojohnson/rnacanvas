/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './BasicDrawingFragment';

import { createBase } from 'Draw/bases/createBase';

import { createPrimaryBond } from 'Draw/bonds/straight/createPrimaryBond';

import { DrawingFragmentDecorator } from './appendPrimaryBond';

let decoratee = null;
let decorator = null;

beforeEach(() => {
  decoratee = new BasicDrawingFragment();
  decorator = new DrawingFragmentDecorator(decoratee);

  let bases = [
    createBase('G'),
    createBase('A'),
    createBase('U'),
    createBase('asdf'),
    createBase('R'),
  ];

  let primaryBonds = [
    createPrimaryBond({ base1: bases[0], base2: bases[1] }),
    createPrimaryBond({ base1: bases[1], base2: bases[4] }),
    createPrimaryBond({ base1: bases[2], base2: bases[3] }),
    createPrimaryBond({ base1: bases[0], base2: bases[2] }),
  ];

  // add some primary bonds to append after
  primaryBonds.forEach(pb => decorator.appendPrimaryBond(pb));
});

afterEach(() => {
  decorator = null;
  decoratee = null;
});

describe('DrawingFragmentDecorator class', () => {
  describe('appendPrimaryBond method', () => {
    let primaryBond = null;

    beforeEach(() => {
      primaryBond = createPrimaryBond({
        base1: createBase('a'),
        base2: createBase('g'),
      });
    });

    afterEach(() => {
      primaryBond = null;
    });

    it('appends primary bond to primary bonds array', () => {
      let n = decoratee.primaryBonds.length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendPrimaryBond(primaryBond);
      expect(decoratee.primaryBonds[n]).toBe(primaryBond);
      expect(primaryBond).toBeTruthy();
    });

    it('appends primary bond line to SVG document', () => {
      let n = decoratee.svg.children().length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendPrimaryBond(primaryBond);
      expect(decoratee.svg.children()[n]).toBe(primaryBond.line);
      expect(primaryBond.line).toBeTruthy();
    });
  });
});
