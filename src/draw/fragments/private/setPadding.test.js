/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BasicDrawingFragment } from './BasicDrawingFragment';

import { createSequence } from 'Draw/sequences/createSequence';

import { DrawingFragmentDecorator } from './setPadding';

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

  test('bases getter', () => {
    expect(decoratee.sequences.length).toBe(0);
    expect(decorator.bases).toStrictEqual([]);

    decorator._appendSequence(createSequence('asdf'));
    let bases = decorator.bases;
    expect(bases.length).toBe(4);
    expect(bases.map(b => b.text.text()).join('')).toBe('asdf');

    decorator._appendSequence(createSequence('qwer'));
    decorator._appendSequence(createSequence('zx cvn'));
    bases = decorator.bases;
    expect(bases.length).toBe(14);
    expect(bases.map(b => b.text.text()).join('')).toBe('asdfqwerzx cvn');
  });

  describe('setPadding method', () => {
    it('does nothing if the drawing fragment has no bases', () => {
      expect(decorator.bases.length).toBe(0);
      let padding = { horizontal: 381, vertical: 19 };
      expect(() => decorator.setPadding(padding)).not.toThrow();
    });

    test('when the drawing fragment has only one base', () => {
      decorator._appendSequence(createSequence('N'));

      let bases = decorator.bases;
      expect(bases.length).toBe(1);
      bases[0].setCenter({ x: 56, y: 88 });

      let padding = { horizontal: 1951, vertical: 1847 };
      decorator.setPadding(padding);

      expect(bases[0].getCenter().x).toBeCloseTo(1951);
      expect(bases[0].getCenter().y).toBeCloseTo(1847);

      expect(decoratee.svg.viewbox().width).toBeCloseTo(1951 * 2);
      expect(decoratee.svg.viewbox().height).toBeCloseTo(1847 * 2);
    });

    it('shifts bases horizontally and vertically', () => {
      decorator._appendSequence(createSequence('asdf qwer'));
      decorator._appendSequence(createSequence('snsf wfkbj'));
      decorator._appendSequence(createSequence('di'));
      let bases = decorator.bases;

      bases.forEach(b => {
        let x = 231 + (50 * Math.random());
        let y = 600 + (100 * Math.random());
        b.setCenter({ x, y });
      });

      bases[3].setCenter({ x: 811, y: 2000 });
      bases[6].setCenter({ x: 197, y: 481 });
      bases[8].setCenter({ x: 500, y: 312 });

      let padding = { horizontal: 504, vertical: 193 };
      decorator.setPadding(padding);

      expect(bases[3].getCenter().x).toBeCloseTo(811 + (504 - 197));
      expect(bases[6].getCenter().x).toBeCloseTo(504);
      expect(bases[8].getCenter().x).toBeCloseTo(500 + (504 - 197));

      expect(bases[3].getCenter().y).toBeCloseTo(2000 + (193 - 312));
      expect(bases[6].getCenter().y).toBeCloseTo(481 + (193 - 312));
      expect(bases[8].getCenter().y).toBeCloseTo(193);
    });

    it('adjusts the width and height of the drawing fragment', () => {
      decorator._appendSequence(createSequence('asdf'));
      decorator._appendSequence(createSequence('zxc'));
      let bases = decorator.bases;

      bases.forEach(b => {
        let x = 125 + (75 * Math.random());
        let y = 230 + (60 * Math.random());
        b.setCenter({ x, y });
      });

      bases[2].setCenter({ x: 111, y: 653 });
      bases[5].setCenter({ x: 809, y: 157 });

      let padding = { horizontal: 1208, vertical: 712 };
      decorator.setPadding(padding);

      let width = decoratee.svg.viewbox().width;
      expect(width).toBeCloseTo((809 - 111) + (1208 * 2));

      let height = decoratee.svg.viewbox().height;
      expect(height).toBeCloseTo((653 - 157) + (712 * 2));
    });

    it('sets view box X and Y coordinates to zero', () => {
      decorator._appendSequence(createSequence('asdf'));
      let bases = decorator.bases;

      bases.forEach(b => {
        let x = 100 + (50 * Math.random());
        let y = 300 + (90 * Math.random());
        b.setCenter({ x, y });
      });

      decoratee.svg.viewbox(57, 62, 1000, 2000);

      let padding = { horizontal: 50, vertical: 25 };
      decorator.setPadding(padding);

      expect(decoratee.svg.viewbox().x).toBeCloseTo(0);
      expect(decoratee.svg.viewbox().y).toBeCloseTo(0);
    });
  });
});
