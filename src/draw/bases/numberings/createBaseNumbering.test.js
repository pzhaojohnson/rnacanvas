/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { BaseNumbering } from './BaseNumbering';

import { createBaseNumbering } from './createBaseNumbering';

describe('createBaseNumbering function', () => {
  it('can create a base numbering from a number', () => {
    let bn = createBaseNumbering(52);
    expect(bn).toBeInstanceOf(BaseNumbering);
    expect(bn.text.text()).toBe('52');
  });
});
