import { createBase } from 'Draw/bases/createBase';

import { createBaseNumbering } from 'Draw/bases/numberings/createBaseNumbering';

import { CircleBaseOutline } from 'Draw/bases/outlines/circle/CircleBaseOutline';

import * as SVG from 'Draw/svg/NodeSVG';

import { BaseDecorator } from './appendTo';

let decoratee = null;
let decorator = null;

let svg = null;

beforeEach(() => {
  decoratee = createBase('T');
  decorator = new BaseDecorator(decoratee);

  svg = SVG.SVG();
  svg.addTo(document.body);

  // add some elements to append after
  svg.text('GGG');
  svg.circle(50);
  svg.rect(100, 200);
  svg.text('asdf');
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

  describe('appendTo method', () => {
    it('appends text', () => {
      expect(decoratee.text.root()).toBeFalsy();

      decorator.appendTo(svg);

      let n = svg.children().length;
      expect(svg.children()[n - 1]).toBe(decoratee.text);
    });

    it('appends numbering', () => {
      let bn = createBaseNumbering(592);
      decoratee.numbering = bn;

      expect(bn.text.root()).toBeFalsy();
      let n = svg.children().length;

      decorator.appendTo(svg);

      expect(bn.text.root()).toBe(svg);
      expect(bn.text.position()).toBeGreaterThanOrEqual(n);
    });

    it('appends outline', () => {
      let cbo = new CircleBaseOutline();
      decoratee.outline = cbo;

      expect(cbo.circle.root()).toBeFalsy();
      let n = svg.children().length;

      decorator.appendTo(svg);

      expect(cbo.circle.root()).toBe(svg);
      expect(cbo.circle.position()).toBeGreaterThanOrEqual(n);
    });

    it('places text on top and outline on bottom', () => {
      expect(decoratee.text.root()).toBeFalsy();

      let bn = createBaseNumbering(67);
      decoratee.numbering = bn;

      let cbo = new CircleBaseOutline();
      decoratee.outline = cbo;

      decorator.appendTo(svg);

      let n = svg.children().length;

      expect(svg.children()[n - 1]).toBe(decoratee.text);
      expect(bn.text.position()).toBeLessThan(decoratee.text.position());
      expect(cbo.circle.position()).toBeLessThan(bn.text.position());
    });
  });

  describe('remove method', () => {
    it('removes text', () => {
      decorator.appendTo(svg);
      expect(decoratee.text.root()).toBe(svg);

      decorator.remove();
      expect(decoratee.text.root()).toBeFalsy();
    });

    it('removes numbering', () => {
      let bn = createBaseNumbering(3);
      decoratee.numbering = bn;

      decorator.appendTo(svg);
      expect(bn.text.root()).toBe(svg);

      decorator.remove();
      expect(bn.text.root()).toBeFalsy();
    });

    it('removes outline', () => {
      let cbo = new CircleBaseOutline();
      decoratee.outline = cbo;

      decorator.appendTo(svg);
      expect(cbo.circle.root()).toBe(svg);

      decorator.remove();
      expect(cbo.circle.root()).toBeFalsy();
    });
  });
});
