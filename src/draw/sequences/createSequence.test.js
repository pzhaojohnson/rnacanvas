/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { Sequence } from './Sequence';

import { Sequence as BasicSequence } from './private/Sequence';

import { createSequence } from './createSequence';

describe('createSequence function', () => {
  test('an empty sequence', () => {
    let seq = createSequence('');
    expect(seq.length).toBe(0);
  });

  test('a one character sequence', () => {
    let seq = createSequence('r');
    expect(seq.length).toBe(1);
    expect(seq.bases[0].text.text()).toBe('r');
  });

  test('a twelve character sequence', () => {
    // one base will have a whitespace character
    let seq = createSequence('AAUcwi fmcsd');

    expect(seq.length).toBe(12);

    seq.bases.forEach(b => {
      expect(b.text.text().length).toBe(1);
    });

    expect(
      seq.bases.map(b => b.text.text()).join('')
    ).toBe('AAUcwi fmcsd');
  });

  it('assigns an empty ID', () => {
    let seq = createSequence('asdf');
    expect(seq.id).toBe('');
  });

  it('returns a fully fledged sequence object', () => {
    let seq = createSequence('qwer');
    expect(seq).toBeInstanceOf(Sequence);
    expect(seq).not.toBeInstanceOf(BasicSequence);
  });
});
