/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { uuidRegex } from 'Utilities/uuidRegex';

import { BaseDecorator } from './fromString';

describe('BaseDecorator class', () => {
  describe('fromString static method', () => {
    it('sets text content to the input string', () => {
      let b = BaseDecorator.fromString('T');
      expect(b.text.text()).toBe('T');

      b = BaseDecorator.fromString('TTUCG');
      expect(b.text.text()).toBe('TTUCG');
    });

    it('gives base text a UUID that starts with a letter', () => {
      let b = BaseDecorator.fromString('A');
      let id = b.text.attr('id');

      // must start with a letter per HTML rules
      expect(id.startsWith('uuid-')).toBeTruthy();

      expect(id).toMatch(uuidRegex);
    });
  });
});
