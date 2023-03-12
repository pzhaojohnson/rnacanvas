import { Base } from 'Draw/bases/Base';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDefaults } from './BaseDefaults';

let svg = null;

let base = null;

let defaults = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  base = new Base({
    text: svg.text('A'),
  });

  defaults = new BaseDefaults();
});

afterEach(() => {
  defaults = null;

  base = null;

  svg.remove();
  svg = null;
});

describe('BaseDefaults class', () => {
  describe('applyTo method', () => {
    it('applies line defaults', () => {
      defaults.text['font-family'].setValue('Courier New');
      defaults.text['font-weight'].setValue(312.9);

      defaults.applyTo(base);

      expect(base.text.attr('font-family')).toBe('Courier New');
      expect(base.text.attr('font-weight')).toBe(312.9);
    });
  });

  describe('toSaved method', () => {
    let saved = null;

    beforeEach(() => {
      defaults.text['font-size'].setValue(4.89);
      defaults.text['font-weight'].setValue(709.1);

      saved = defaults.toSaved();
    });

    afterEach(() => {
      saved = null;
    });

    it('includes line defaults', () => {
      expect(saved.text['font-size']).toBe(4.89);
      expect(saved.text['font-weight']).toBe(709.1);
    });

    test('JSON conversion', () => {
      let json = JSON.stringify(saved);
      expect(JSON.parse(json)).toStrictEqual(saved);
    });
  });

  describe('applySaved method', () => {
    it('applies saved text defaults', () => {
      defaults.applySaved({
        text: {
          'font-family': '"Gill Sans"',
          'font-size': 112.05,
        },
      });

      expect(defaults.text['font-family'].getValue()).toBe('"Gill Sans"');
      expect(defaults.text['font-size'].getValue()).toBe(112.05);
    });

    test('some invalid saved text defaults', () => {
      let saved = {
        text: {
          'font-size': 'asdf',
          'font-style': 111,
        },
      };

      expect(() => defaults.applySaved(saved))
        .not.toThrow();
    });

    test('undefined saved values', () => {
      // empty saved text defaults object
      expect(() => defaults.applySaved({ text: {} }))
        .not.toThrow();

      // missing saved text defaults object
      expect(() => defaults.applySaved({}))
        .not.toThrow();

      // just a value of undefined
      expect(() => defaults.applySaved(undefined))
        .not.toThrow();
    });
  });
});
