import { Svg as SVGSvg } from '@svgdotjs/svg.js';

import { BasicDrawingFragment } from './BasicDrawingFragment';

describe('BasicDrawingFragment class', () => {
  describe('constructor', () => {
    let basicDrawingFragment = null;

    beforeEach(() => {
      basicDrawingFragment = new BasicDrawingFragment();
    });

    afterEach(() => {
      basicDrawingFragment = null;
    });

    it('initializes SVG document', () => {
      expect(basicDrawingFragment.svg).toBeInstanceOf(SVGSvg);
    });

    it('initializes sequences array', () => {
      expect(basicDrawingFragment.sequences).toStrictEqual([]);
    });

    it('initializes primary, secondary and tertiary bonds arrays', () => {
      expect(basicDrawingFragment.primaryBonds).toStrictEqual([]);
      expect(basicDrawingFragment.secondaryBonds).toStrictEqual([]);
      expect(basicDrawingFragment.tertiaryBonds).toStrictEqual([]);
    });
  });
});
