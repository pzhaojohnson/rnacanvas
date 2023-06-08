/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './BasicDrawingFragment';

import { createSequence } from 'Draw/sequences/createSequence';

import { DrawingFragmentDecorator } from './appendSequence';

let decoratee = null;
let decorator = null;

beforeEach(() => {
  decoratee = new BasicDrawingFragment();
  decorator = new DrawingFragmentDecorator(decoratee);

  // add some sequences to append after
  decorator.appendSequence(createSequence('asdf'));
  decorator.appendSequence(createSequence('A'));
  decorator.appendSequence(createSequence(''));
  decorator.appendSequence(createSequence('askuh sadh uf'));
});

afterEach(() => {
  decoratee = null;
  decorator = null;
});

describe('DrawingFragmentDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  describe('appendSequence method', () => {
    it('appends sequence to sequences array', () => {
      let seq = createSequence('qwer');

      let n = decoratee.sequences.length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendSequence(seq);
      expect(decoratee.sequences[n]).toBe(seq);
    });

    it('appends SVG elements of sequence to SVG document', () => {
      let seq = createSequence('zxcv');

      let n = decoratee.svg.children().length;
      expect(n).toBeGreaterThanOrEqual(3);

      decorator.appendSequence(seq);

      seq.bases.forEach(b => {
        expect(b.text.root()).toBe(decoratee.svg);
        expect(b.text.position()).toBeGreaterThanOrEqual(n);
      });
    });

    describe('adding primary bonds', () => {
      test('for an empty sequence', () => {
        let seq = createSequence('');
        let n = decoratee.primaryBonds.length;

        decorator.appendSequence(seq);

        // no primary bonds were added
        expect(decoratee.primaryBonds.length).toBe(n);
      });

      test('for a sequence of length one', () => {
        let seq = createSequence('q');
        let n = decoratee.primaryBonds.length;

        decorator.appendSequence(seq);

        // no primary bonds were added
        expect(decoratee.primaryBonds.length).toBe(n);
      });

      test('for a sequence of length two', () => {
        let seq = createSequence('ad');
        let n = decoratee.primaryBonds.length;

        decorator.appendSequence(seq);
        expect(decoratee.primaryBonds.length).toBe(n + 1);

        let pb1 = decoratee.primaryBonds[n];
        expect(pb1.base1).toBe(seq.bases[0]);
        expect(pb1.base2).toBe(seq.bases[1]);
      });

      test('for a sequence of length five', () => {
        let seq = createSequence('aolxd');
        let n = decoratee.primaryBonds.length;

        decorator.appendSequence(seq);
        expect(decoratee.primaryBonds.length).toBe(n + 4);

        let pb1 = decoratee.primaryBonds[n];
        let pb2 = decoratee.primaryBonds[n + 1];
        let pb3 = decoratee.primaryBonds[n + 2];
        let pb4 = decoratee.primaryBonds[n + 3];

        expect(pb1.base1).toBe(seq.bases[0]);
        expect(pb1.base2).toBe(seq.bases[1]);
        expect(pb2.base1).toBe(seq.bases[1]);
        expect(pb2.base2).toBe(seq.bases[2]);
        expect(pb3.base1).toBe(seq.bases[2]);
        expect(pb3.base2).toBe(seq.bases[3]);
        expect(pb4.base1).toBe(seq.bases[3]);
        expect(pb4.base2).toBe(seq.bases[4]);
      });
    });
  });
});
