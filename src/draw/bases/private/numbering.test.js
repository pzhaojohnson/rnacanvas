import { createBase } from 'Draw/bases/createBase';

import { createBaseNumbering } from 'Draw/bases/numberings/createBaseNumbering';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDecorator } from './numbering';

let decoratee = null;
let decorator = null;

let svg = null;

beforeEach(() => {
  decoratee = createBase('G');
  decorator = new BaseDecorator(decoratee);

  svg = SVG.SVG();
  svg.addTo(document.body);
});

afterEach(() => {
  svg.remove();
  svg = null;

  decorator = null;
  decoratee = null;
});

describe('BaseDecorator class', () => {
  describe('constructor', () => {
    it('stores decoratee', () => {
      expect(decorator.decoratee).toBe(decoratee);
      expect(decoratee).toBeTruthy();
    });
  });

  describe('numbering getter', () => {
    test('when the base has numbering', () => {
      let bn = createBaseNumbering(127);
      decoratee._numbering = bn;
      expect(decorator.numbering).toBe(bn);
    });

    test('when the base does not have numbering', () => {
      expect(decoratee._numbering).toBeUndefined();
      expect(decorator.numbering).toBeUndefined();
    });
  });

  describe('numbering setter', () => {
    it('stores the provided base numbering', () => {
      let bn = createBaseNumbering(-187);
      decorator.numbering = bn;
      expect(decorator.numbering).toBe(bn);
    });

    it('repositions the provided base numbering', () => {
      decoratee.text.addTo(svg);
      decoratee.setCenter({ x: 2689, y: 1489 });

      let bn = createBaseNumbering(98731);
      bn.lineAngle = 0;
      bn.basePadding = 10;

      decorator.numbering = bn;

      expect(bn.line.attr('x1')).toBeCloseTo(2699);
      expect(bn.line.attr('y1')).toBeCloseTo(1489);
    });

    it('appends the provided base numbering to the SVG document', () => {
      decoratee.text.addTo(svg);

      let bn = createBaseNumbering(1000);
      decorator.numbering = bn;

      let n = svg.children().length;
      expect(svg.children()[n - 1]).toBe(bn.text);
    });

    it('does not throw if there is no SVG document to append to', () => {
      expect(decoratee.text.root()).toBeFalsy();

      let bn = createBaseNumbering(123);
      decorator.numbering = bn;
      expect(decorator.numbering).toBe(bn);

      expect(bn.text.root()).toBeFalsy();
    });

    it('removes any numbering that the base already had', () => {
      decoratee.text.addTo(svg);

      let bn1 = createBaseNumbering(100);
      decorator.numbering = bn1;
      expect(decorator.numbering).toBe(bn1);

      // was added to the SVG document
      expect(bn1.text.root()).toBe(svg);

      let bn2 = createBaseNumbering(200);
      decorator.numbering = bn2;
      expect(decorator.numbering).toBe(bn2);

      // was removed from the SVG document
      expect(bn1.text.root()).toBeFalsy();
    });

    it('removes numbering from the base when it receives undefined', () => {
      decoratee.text.addTo(svg);

      let bn = createBaseNumbering(52);
      decorator.numbering = bn;
      expect(decorator.numbering).toBe(bn);

      // was added to the SVG document
      expect(bn.text.root()).toBe(svg);

      decorator.numbering = undefined;
      expect(decorator.numbering).toBeUndefined();

      // was removed from the SVG document
      expect(bn.text.root()).toBeFalsy();
    });

    it('does not throw if the base already has no numbering', () => {
      // is already undefined
      expect(decorator.numbering).toBeUndefined();

      decorator.numbering = undefined;
    });
  });
});
