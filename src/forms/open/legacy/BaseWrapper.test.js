import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

import { Base } from 'Draw/bases/Base';

import { addCircleOutline as outlineBase } from 'Draw/bases/outlines/circle/add';

import { BaseWrapper } from './BaseWrapper';

let svg = null;

let base = null;
let baseWrapper = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);

  base = new Base({ text: svg.text('A') });
  baseWrapper = new BaseWrapper(base);
});

afterEach(() => {
  baseWrapper = null;
  base = null;

  svg.remove();
  svg = null;
});

describe('BaseWrapper class', () => {
  test('base property', () => {
    let base = new Base({ text: svg.text('G') });
    let baseWrapper = new BaseWrapper(base);
    expect(baseWrapper.base).toBe(base);
  });

  describe('outline method', () => {
    test('missing outline spec', () => {
      baseWrapper.outline();
      let outline = base.outline;

      expect(outline.circle.attr('stroke')).toBe('#00ffff');
      expect(outline.circle.attr('stroke-opacity')).toBe(1);
      expect(outline.circle.attr('fill')).toBe('#c3ffff');
      expect(outline.circle.attr('fill-opacity')).toBe(1);
    });

    test('when stroke and fill are unspecified', () => {
      baseWrapper.outline({});
      let outline = base.outline;

      expect(outline.circle.attr('stroke')).toBe('#00ffff');
      expect(outline.circle.attr('stroke-opacity')).toBe(1);
      expect(outline.circle.attr('fill')).toBe('#c3ffff');
      expect(outline.circle.attr('fill-opacity')).toBe(1);
    });

    test('when only stroke is specified', () => {
      baseWrapper.outline({ stroke: new SVGColor('#321fcd') });
      let outline = base.outline;

      expect(outline.circle.attr('stroke')).toBe('#321fcd');
      expect(outline.circle.attr('stroke-opacity')).toBe(1);
      expect(outline.circle.attr('fill')).toBe('#c3ffff');
      expect(outline.circle.attr('fill-opacity')).toBe(0);
    });

    test('when only fill is specified', () => {
      baseWrapper.outline({ fill: new SVGColor('#abd541') });
      let outline = base.outline;

      expect(outline.circle.attr('stroke')).toBe('#00ffff');
      expect(outline.circle.attr('stroke-opacity')).toBe(0);
      expect(outline.circle.attr('fill')).toBe('#abd541');
      expect(outline.circle.attr('fill-opacity')).toBe(1);
    });

    test('when stroke and fill are specified', () => {
      baseWrapper.outline({
        stroke: new SVGColor('#f3c512'),
        fill: new SVGColor('#bbfa69'),
      });

      let outline = base.outline;

      expect(outline.circle.attr('stroke')).toBe('#f3c512');
      expect(outline.circle.attr('stroke-opacity')).toBe(1);
      expect(outline.circle.attr('fill')).toBe('#bbfa69');
      expect(outline.circle.attr('fill-opacity')).toBe(1);
    });

    it('sends base outline to the back', () => {
      // add elements for the base outline to be below
      svg.circle(20);
      svg.text('B');
      svg.rect(10, 50);

      baseWrapper.outline();

      expect(base.outline.circle.position()).toBe(0); // at the bottom
    });

    it('creates base outline with nonzero radius and stroke width', () => {
      baseWrapper.outline();
      let outline = base.outline;

      // nonzero radius is necessary to see fill
      expect(outline.circle.attr('r')).toBe(7);

      // nonzero stroke width is necessary to see stroke
      expect(outline.circle.attr('stroke-width')).toBe(1);
    });

    test('when the base is already outlined', () => {
      outlineBase(base);
      let prevOutline = base.outline;
      expect(prevOutline).toBeTruthy();

      baseWrapper.outline();
      expect(base.outline).not.toBe(prevOutline); // a new outline
      expect(base.outline).toBeTruthy();

      expect(prevOutline.circle.root()).toBeFalsy(); // was removed
    });
  });
});
