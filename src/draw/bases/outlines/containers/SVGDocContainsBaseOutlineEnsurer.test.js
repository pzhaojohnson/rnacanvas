import * as SVG from '@svgdotjs/svg.js';

import { SVGDocContainsBaseOutlineEnsurer } from './SVGDocContainsBaseOutlineEnsurer';

let svgDocContainsBaseOutlineEnsurer = null;

let baseOutline = null;

beforeEach(() => {
  svgDocContainsBaseOutlineEnsurer = new SVGDocContainsBaseOutlineEnsurer();

  baseOutline = {
    parent: undefined,
    appendTo: () => {},
  };
});

afterEach(() => {
  baseOutline = null;

  svgDocContainsBaseOutlineEnsurer = null;
});

describe('SVGDocContainsBaseOutlineEnsurer class', () => {
  describe('ensureFor method', () => {
    test('base outline parent is initially undefined', () => {
      let svgDoc = new SVG.Svg();

      baseOutline.parent = undefined;
      baseOutline.appendTo = jest.fn();

      svgDocContainsBaseOutlineEnsurer.ensureFor({ svgDoc, baseOutline });

      expect(baseOutline.appendTo).toHaveBeenCalledTimes(1);
      expect(baseOutline.appendTo.mock.calls[0][0]).toBe(svgDoc);
    });

    test('base outline parent is initially null', () => {
      let svgDoc = new SVG.Svg();

      baseOutline.parent = null;
      baseOutline.appendTo = jest.fn();

      svgDocContainsBaseOutlineEnsurer.ensureFor({ svgDoc, baseOutline });

      expect(baseOutline.appendTo).toHaveBeenCalledTimes(1);
      expect(baseOutline.appendTo.mock.calls[0][0]).toBe(svgDoc);
    });

    test('base outline starts off in a different SVG doc', () => {
      let svgDoc1 = new SVG.Svg();
      let svgDoc2 = new SVG.Svg();

      baseOutline.parent = svgDoc1;
      baseOutline.appendTo = jest.fn();

      svgDocContainsBaseOutlineEnsurer.ensureFor({
        svgDoc: svgDoc2,
        baseOutline,
      });

      expect(baseOutline.appendTo).toHaveBeenCalledTimes(1);
      expect(baseOutline.appendTo.mock.calls[0][0]).toBe(svgDoc2);
    });

    test('base outline is already in the SVG doc', () => {
      let svgDoc = new SVG.Svg();

      baseOutline.parent = svgDoc;
      baseOutline.appendTo = jest.fn();

      svgDocContainsBaseOutlineEnsurer.ensureFor({ svgDoc, baseOutline });

      expect(baseOutline.appendTo).not.toHaveBeenCalled();
    });
  });
});
