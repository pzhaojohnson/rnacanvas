/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './BasicDrawingFragment';

import { createSequence } from 'Draw/sequences/createSequence';

import { DrawingFragmentDecorator } from './bases';

let decoratee = null;
let decorator = null;

beforeEach(() => {
  decoratee = new BasicDrawingFragment();
  decorator = new DrawingFragmentDecorator(decoratee);
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

  describe('bases getter', () => {
    test('when there are zero sequences', () => {
      expect(decoratee.sequences.length).toBe(0);
      expect(decorator.bases).toStrictEqual([]);
    });

    test('when there is one sequence', () => {
      decorator._appendSequence(createSequence('asdf'));
      expect(decoratee.sequences.length).toBe(1);

      let bases = decorator.bases;
      expect(bases.length).toBe(4);

      expect(
        bases.map(b => b.text.text()).join('')
      ).toBe('asdf');
    });

    test('when there are four sequences', () => {
      decorator._appendSequence(createSequence('siuhj'));
      decorator._appendSequence(createSequence(' '));
      decorator._appendSequence(createSequence('SOSFJ'));
      decorator._appendSequence(createSequence('SJ SOIJ'));
      expect(decoratee.sequences.length).toBe(4);

      let bases = decorator.bases;
      expect(bases.length).toBe(18);

      expect(
        bases.map(b => b.text.text()).join('')
      ).toBe('siuhj SOSFJSJ SOIJ');
    });
  });
});
