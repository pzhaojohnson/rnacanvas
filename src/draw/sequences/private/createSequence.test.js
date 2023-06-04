/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { createSequence } from './createSequence';

describe('createSequence function', () => {
  it('can create a sequence from a string', () => {
    let seq = createSequence('asfbkuhSDIJGH');
    expect(seq.bases.length).toBe(13);

    expect(
      seq.bases.map(b => b.text.text()).join('')
    ).toBe('asfbkuhSDIJGH');
  });
});
