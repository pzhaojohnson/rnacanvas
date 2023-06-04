/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { SequenceDecorator } from './fromString';

describe('SequenceDecorator class', () => {
  describe('fromString static method', () => {
    test('an empty string', () => {
      let seq = SequenceDecorator.fromString('');
      expect(seq.bases).toStrictEqual([]);
    });

    test('a string with one character', () => {
      let seq = SequenceDecorator.fromString('b');
      expect(seq.bases.length).toBe(1);
      expect(seq.bases[0].text.text()).toBe('b');
    });

    test('a string with multiple characters', () => {
      let seq = SequenceDecorator.fromString('235huxSVD');
      expect(seq.bases.length).toBe(9);

      expect(
        seq.bases.map(b => b.text.text()).join('')
      ).toBe('235huxSVD');

      seq.bases.forEach(b => {
        expect(b.text.text().length).toBe(1);
      });
    });

    it('gives the sequence an empty string for an ID', () => {
      let seq = SequenceDecorator.fromString('asdf');
      expect(seq.id).toBe('');
    });
  });
});
