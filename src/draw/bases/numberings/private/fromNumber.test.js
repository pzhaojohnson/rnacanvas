/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { uuidRegex } from 'Utilities/uuidRegex';

import { normalizeAngle } from 'Math/angles/normalizeAngle';

import { BaseNumberingDecorator } from './fromNumber';

describe('BaseNumberingDecorator class', () => {
  describe('fromNumber static method', () => {
    it('sets text content to the provided number', () => {
      let bn = BaseNumberingDecorator.fromNumber(692);
      expect(bn.text.text()).toBe('692');

      bn = BaseNumberingDecorator.fromNumber(-104);
      expect(bn.text.text()).toBe('-104');

      bn = BaseNumberingDecorator.fromNumber(0.17125);
      expect(bn.text.text()).toBe('0.17125');
    });

    it('assigns UUIDs to base numbering text and line', () => {
      let bn = BaseNumberingDecorator.fromNumber(5);
      let textId = bn.text.attr('id');
      let lineId = bn.line.attr('id');
      expect(textId).toMatch(uuidRegex);
      expect(lineId).toMatch(uuidRegex);

      // must start with letters per HTML rules
      expect(textId.startsWith('uuid-')).toBeTruthy();
      expect(lineId.startsWith('uuid-')).toBeTruthy();
    });

    it('applies default text attributes', () => {
      let bn = BaseNumberingDecorator.fromNumber(12);

      // just check some attributes
      expect(bn.text.attr('font-size')).toBe(9);
      expect(bn.text.attr('fill')).toBe('#525252');
    });

    it('applies default line attributes', () => {
      let bn = BaseNumberingDecorator.fromNumber(148219);

      // just check some attributes
      expect(bn.line.attr('stroke')).toBe('#525252');
      expect(bn.line.attr('stroke-width')).toBe(1);
    });

    it('applies default base padding and line length properties', () => {
      let bn = BaseNumberingDecorator.fromNumber(-378);
      expect(bn.basePadding).toBeCloseTo(7);
      expect(bn.lineLength).toBeCloseTo(9);
    });

    it('sets line angle to zero', () => {
      let bn = BaseNumberingDecorator.fromNumber(10);
      expect(normalizeAngle(bn.lineAngle, -Math.PI)).toBeCloseTo(0);
    });

    it('passes a base center of (0, 0) to the base numbering', () => {
      let bn = BaseNumberingDecorator.fromNumber(1398);
      expect(bn.line.attr('x1') - bn.basePadding).toBeCloseTo(0);
      expect(bn.line.attr('y1')).toBeCloseTo(0);
    });
  });
});
