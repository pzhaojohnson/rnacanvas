/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { createBase } from 'Draw/bases/createBase';

import { Sequence } from './Sequence';

describe('Sequence class', () => {
  describe('constructor', () => {
    it('stores ID', () => {
      let seq = new Sequence({ id: '197159ashdf', bases: [] });
      expect(seq.id).toBe('197159ashdf');
    });

    it('stores bases', () => {
      let bases = [
        createBase('B'),
        createBase('c'),
        createBase('G'),
        createBase('CCC'),
      ];

      let seq = new Sequence({ id: '', bases });
      expect(seq.bases).toStrictEqual(bases);

      // made a new array
      expect(seq.bases).not.toBe(bases);
    });
  });
});
