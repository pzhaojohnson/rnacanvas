import { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { pickOneRandom } from 'Array/pickOneRandom';

import { BaseNumberingDefaults } from './BaseNumberingDefaults';

const someFontFamilies = [
  'Georgia, serif',
  '"Goudy Bookletter 1911", sans-serif',
  '"Lucida Console", Courier, monospace',
  '"Comic Sans", sans-serif',
  'cursive',
  'system-ui',
];

let svg = null;

let baseNumbering = null;

let randomTextAttributes = null;
let randomLineAttributes = null;
let randomProperties = null;

let randomDefaults = null;

function createBaseNumbering() {
  let baseCenter = { x: 20, y: 60 };

  let text = svg.text('109');
  text.center(30, 80);

  let line = svg.line(21, 62, 29, 78);

  return new BaseNumbering(text, line, baseCenter);
}

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  baseNumbering = createBaseNumbering();

  randomTextAttributes = [
    ['font-family', pickOneRandom(someFontFamilies)],
    ['font-size', 18 * Math.random()],
    ['font-weight', 100 + (800 * Math.random())],
    ['fill', SVGColor.random().toHex()],
    ['fill-opacity', Math.random()],
  ];

  randomLineAttributes = [
    ['stroke', SVGColor.random().toHex()],
    ['stroke-width', 20 * Math.random()],
    ['stroke-opacity', Math.random()],
  ];

  randomProperties = [
    ['basePadding', 30 * Math.random()],
    ['lineLength', 25 * Math.random()],
  ];

  randomDefaults = new BaseNumberingDefaults();

  randomTextAttributes
    .forEach(a => randomDefaults.text[a[0]].setValue(a[1]));

  randomLineAttributes
    .forEach(a => randomDefaults.line[a[0]].setValue(a[1]));

  randomProperties
    .forEach(p => randomDefaults[p[0]].setValue(p[1]));
});

afterEach(() => {
  randomDefaults = null;

  randomTextAttributes = null;
  randomLineAttributes = null;
  randomProperties = null;

  baseNumbering = null;

  svg.remove();
  svg = null;
});

describe('BaseNumberingDefaults class', () => {
  test('constructor', () => {
    expect(() => new BaseNumberingDefaults())
      .not.toThrow();
  });

  describe('applyTo method', () => {
    beforeEach(() => {
      randomDefaults.applyTo(baseNumbering);
    });

    it('applies text attributes', () => {
      randomTextAttributes
        .forEach(a => expect(baseNumbering.text.attr(a[0])).toBe(a[1]));
    });

    it('applies line attributes', () => {
      randomLineAttributes
        .forEach(a => expect(baseNumbering.line.attr(a[0])).toBe(a[1]));
    });

    it('applies properties', () => {
      randomProperties
        .forEach(p => expect(baseNumbering[p[0]]).toBeCloseTo(p[1]));
    });
  });

  describe('toSaved method', () => {
    let saved = null;

    beforeEach(() => {
      saved = randomDefaults.toSaved();
    });

    it('includes text attributes', () => {
      randomTextAttributes
        .forEach(a => expect(saved.text[a[0]]).toBe(a[1]));
    });

    it('includes line attributes', () => {
      randomLineAttributes
        .forEach(a => expect(saved.line[a[0]]).toBe(a[1]));
    });

    it('includes properties', () => {
      randomProperties
        .forEach(p => expect(saved[p[0]]).toBeCloseTo(p[1]));
    });

    test('JSON conversion', () => {
      let json = JSON.stringify(saved);
      expect(JSON.parse(json)).toStrictEqual(saved);
    });
  });

  describe('applySaved method', () => {
    describe('applying saved values', () => {
      let defaults = null;

      beforeEach(() => {
        defaults = new BaseNumberingDefaults();

        let saved = randomDefaults.toSaved();
        defaults.applySaved(saved);
      });

      it('applies saved text attributes', () => {
        randomTextAttributes
          .forEach(a => expect(defaults.text[a[0]].getValue()).toBe(a[1]));
      });

      it('applies saved line attributes', () => {
        randomLineAttributes
          .forEach(a => expect(defaults.line[a[0]].getValue()).toBe(a[1]));
      });

      it('applies saved properties', () => {
        randomProperties
          .forEach(p => expect(defaults[p[0]].getValue()).toBeCloseTo(p[1]));
      });
    });

    describe('ignoring invalid saved values', () => {
      beforeEach(() => {
        // all values are invalid
        randomDefaults.applySaved({
          text: {
            'font-family': 2,
            'font-size': 'asdf',
            'font-weight': false,
            'fill': 'zxcv',
            'fill-opacity': 'AAA',
          },
          line: {
            'stroke': 8,
            'stroke-width': 'Q',
            'stroke-opacity': {},
          },
          basePadding: 'soifeg',
          lineLength: false,
        });
      });

      it('ignores invalid saved text attributes', () => {
        randomTextAttributes.forEach(a => {
          expect(randomDefaults.text[a[0]].getValue()).toBe(a[1]);
        });
      });

      it('ignores invalid saved line attributes', () => {
        randomLineAttributes.forEach(a => {
          expect(randomDefaults.line[a[0]].getValue()).toBe(a[1]);
        });
      });

      it('ignores invalid saved properties', () => {
        randomProperties.forEach(p => {
          expect(randomDefaults[p[0]].getValue()).toBeCloseTo(p[1]);
        });
      });
    });

    describe('ignoring undefined saved values', () => {
      beforeEach(() => {
        // with defined text and line objects
        randomDefaults.applySaved({ text: {}, line: {} });

        // with undefined text and line objects
        randomDefaults.applySaved({});

        // simply a value of undefined
        randomDefaults.applySaved(undefined);
      });

      it('ignores undefined saved text attributes', () => {
        randomTextAttributes.forEach(a => {
          expect(randomDefaults.text[a[0]].getValue()).toBe(a[1]);
        });
      });

      it('ignores undefined saved line attributes', () => {
        randomLineAttributes.forEach(a => {
          expect(randomDefaults.line[a[0]].getValue()).toBe(a[1]);
        });
      });

      it('ignores undefined saved properties', () => {
        randomProperties.forEach(p => {
          expect(randomDefaults[p[0]].getValue()).toBeCloseTo(p[1]);
        });
      });
    });
  });
});
