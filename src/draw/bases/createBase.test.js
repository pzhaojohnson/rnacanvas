/**
 * Makes it possible to set certain SVG element coordinates.
 */
import * as SVG from 'Draw/svg/NodeSVG';

import { Base } from './Base';

import { createBase } from './createBase';

describe('createBase function', () => {
  it('can create a base from a string', () => {
    let b = createBase('QOCV');
    expect(b).toBeInstanceOf(Base);
    expect(b.text.text()).toBe('QOCV');
  });
});
