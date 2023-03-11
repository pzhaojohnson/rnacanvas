import { StraightBond } from 'Draw/bonds/straight/StraightBond';

import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { StraightBondDefaults } from './StraightBondDefaults';

let svg = null;

let straightBond = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);
});

/**
 * Create a straight bond.
 */
beforeEach(() => {
  let base1 = new Base({ text: svg.text('A') });
  let base2 = new Base({ text: svg.text('U') });

  base1.recenter({ x: 50, y: 100 });
  base2.recenter({ x: 20, y: 150 });

  let line = svg.line(50, 100, 20, 150);

  straightBond = new StraightBond(line, base1, base2);
});

beforeEach(() => {
  defaults = new StraightBondDefaults();
});

afterEach(() => {
  defaults = null;

  straightBond = null;

  svg.remove();
  svg = null;
});

describe('StraightBondDefaults class', () => {
  describe('applyTo method', () => {
    it('applies line attributes', () => {
      // just test some line attributes
      defaults.line['stroke'].setValue('#ae4801');
      defaults.line['stroke-width'].setValue(6.1802);

      defaults.applyTo(straightBond);

      expect(straightBond.line.attr('stroke')).toBe('#ae4801');
      expect(straightBond.line.attr('stroke-width')).toBe(6.1802);
    });

    it('applies properties', () => {
      defaults.basePadding1.setValue(4.0921);
      defaults.basePadding2.setValue(8.4903);

      defaults.applyTo(straightBond);

      expect(straightBond.basePadding1).toBeCloseTo(4.0921);
      expect(straightBond.basePadding2).toBeCloseTo(8.4903);
    });
  });

  describe('toSaved method', () => {
    let saved = null;

    beforeEach(() => {
      // just test some line attributes
      defaults.line['stroke-width'].setValue(10.0023);
      defaults.line['stroke-opacity'].setValue(0.09351);

      defaults.basePadding1.setValue(6.1894);
      defaults.basePadding2.setValue(7.2026);

      saved = defaults.toSaved();
    });

    afterEach(() => {
      saved = null;
    });

    it('includes line attributes', () => {
      expect(saved.line['stroke-width']).toBe(10.0023);
      expect(saved.line['stroke-opacity']).toBe(0.09351);
    });

    it('includes properties', () => {
      expect(saved.basePadding1).toBe(6.1894);
      expect(saved.basePadding2).toBe(7.2026);
    });

    test('JSON conversion', () => {
      let json = JSON.stringify(saved);
      expect(JSON.parse(json)).toStrictEqual(saved);
    });
  });

  describe('applySaved method', () => {
    it('applies saved line defaults', () => {
      defaults.applySaved({
        line: {
          'stroke': '#ab7120',
          'stroke-width': 1.8491,
        },
      });

      expect(defaults.line['stroke'].getValue()).toBe('#ab7120');
      expect(defaults.line['stroke-width'].getValue()).toBe(1.8491);
    });

    it('ignores undefined saved line defaults', () => {
      defaults.line['stroke'].setValue('#120aba');
      defaults.line['stroke-opacity'].setValue(0.6031);

      defaults.applySaved({ line: undefined });
      defaults.applySaved(undefined);

      expect(defaults.line['stroke'].getValue()).toBe('#120aba');
      expect(defaults.line['stroke-opacity'].getValue()).toBe(0.6031);
    });

    it('applies saved properties', () => {
      defaults.applySaved({
        basePadding1: 6.92014,
        basePadding2: 3.1359,
      });

      expect(defaults.basePadding1.getValue()).toBe(6.92014);
      expect(defaults.basePadding2.getValue()).toBe(3.1359);
    });

    it('ignores invalid saved properties', () => {
      defaults.basePadding1.setValue(5.9);
      defaults.basePadding2.setValue(6.2);

      defaults.applySaved({
        basePadding1: 'asdf',
        basePadding2: {},
      });

      expect(defaults.basePadding1.getValue()).toBe(5.9);
      expect(defaults.basePadding2.getValue()).toBe(6.2);
    });

    it('ignores undefined saved properties', () => {
      defaults.basePadding1.setValue(5.92207);

      defaults.applySaved({});
      defaults.applySaved(undefined);

      expect(defaults.basePadding1.getValue()).toBe(5.92207);
    });

    it('processes saved properties on an individual basis', () => {
      defaults.basePadding1.setValue(5.1538);

      defaults.applySaved({
        // invalid
        basePadding1: 'zxcv',

        // should still get applied
        basePadding2: 9.14014,
      });

      expect(defaults.basePadding1.getValue()).toBe(5.1538);
      expect(defaults.basePadding2.getValue()).toBe(9.14014);
    });
  });
});
