import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';

import { secondaryBondTypes } from 'Draw/bonds/straight/SecondaryBond';

import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { SecondaryBondDefaults } from './SecondaryBondDefaults';

let svg = null;

let secondaryBonds = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);
});

/**
 * Create a secondary bond of each type.
 */
beforeEach(() => {
  secondaryBonds = {};
  let letterPairs = [['A', 'U'], ['g', 'c'], ['G', 't'], ['A', 'C']];

  letterPairs.forEach(letterPair => {
    let base1 = new Base({ text: svg.text(letterPair[0]) });
    let base2 = new Base({ text: svg.text(letterPair[1]) });

    let [x1, y1] = [25 * Math.random(), 500 * Math.random()];
    let [x2, y2] = [800 * Math.random(), 100 * Math.random()];

    let line = svg.line(x1, y1, x2, y2);

    let sb = new SecondaryBond(line, base1, base2);
    secondaryBonds[sb.type] = sb;
  });

  secondaryBondTypes.forEach(t => {
    expect(secondaryBonds[t]).toBeTruthy();
  });
});

beforeEach(() => {
  defaults = new SecondaryBondDefaults();
});

afterEach(() => {
  defaults = null;

  secondaryBonds = null;

  svg.remove();
  svg = null;
});

describe('SecondaryBondDefaults class', () => {
  test('applyTo method', () => {
    defaults.AUT.line['stroke'].setValue('#bcf091');
    defaults.AUT.basePadding1.setValue(17.19719);

    defaults.GUT.line['stroke'].setValue('#50281c');
    defaults.GUT.basePadding2.setValue(8.1875);

    // on an AUT secondary bond
    defaults.applyTo(secondaryBonds['AUT']);
    expect(secondaryBonds['AUT'].line.attr('stroke')).toBe('#bcf091');
    expect(secondaryBonds['AUT'].basePadding1).toBeCloseTo(17.19719);

    // on a GUT secondary bond
    defaults.applyTo(secondaryBonds['GUT']);
    expect(secondaryBonds['GUT'].line.attr('stroke')).toBe('#50281c');
    expect(secondaryBonds['GUT'].basePadding2).toBeCloseTo(8.1875);
  });

  test('toSaved method', () => {
    defaults.AUT.line['stroke-opacity'].setValue(0.176821);
    defaults.GC.line['stroke-width'].setValue(12.14591);
    defaults.GUT.line['stroke'].setValue('#cb0142');
    defaults.other.basePadding2.setValue(9.157825);

    let saved = defaults.toSaved();

    // includes AUT defaults
    expect(saved.AUT.line['stroke-opacity']).toBe(0.176821);

    // includes GC defaults
    expect(saved.GC.line['stroke-width']).toBe(12.14591);

    // includes GUT defaults
    expect(saved.GUT.line['stroke']).toBe('#cb0142');

    // includes other defaults
    expect(saved.other.basePadding2).toBe(9.157825);
  });
});
