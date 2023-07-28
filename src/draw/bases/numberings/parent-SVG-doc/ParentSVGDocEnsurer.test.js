import * as SVG from '@svgdotjs/svg.js';

import { ParentSVGDocEnsurer } from './ParentSVGDocEnsurer';

let parentSVGDocDeterminer = null;

let parentSVGDocEnsurer = null;

let baseNumbering = null;

beforeEach(() => {
  parentSVGDocDeterminer = {
    determineFor: () => undefined,
  };

  parentSVGDocEnsurer = new ParentSVGDocEnsurer({
    parentSVGDocDeterminer,
  });

  baseNumbering = {
    appendTo: () => {},
  };
});

afterEach(() => {
  baseNumbering = null;

  parentSVGDocEnsurer = null;

  parentSVGDocDeterminer = null;
});

describe('ParentSVGDocEnsurer class', () => {
  describe('ensureFor method', () => {
    test('base numbering has no parent SVG doc', () => {
      parentSVGDocDeterminer.determineFor = () => undefined;

      baseNumbering.appendTo = jest.fn();
      let svgDoc = new SVG.Svg();

      parentSVGDocEnsurer.ensureFor({ baseNumbering, svgDoc });

      expect(baseNumbering.appendTo).toHaveBeenCalledTimes(1);
      expect(baseNumbering.appendTo.mock.calls[0][0]).toBe(svgDoc);
    });

    test('base numbering has a different parent SVG doc', () => {
      let svgDoc1 = new SVG.Svg();
      let svgDoc2 = new SVG.Svg();

      parentSVGDocDeterminer.determineFor = () => svgDoc1;

      baseNumbering.appendTo = jest.fn();

      parentSVGDocEnsurer.ensureFor({ baseNumbering, svgDoc: svgDoc2 });

      expect(baseNumbering.appendTo).toHaveBeenCalledTimes(1);
      expect(baseNumbering.appendTo.mock.calls[0][0]).toBe(svgDoc2);
    });

    test('base numbering already has the same parent SVG doc', () => {
      let svgDoc = new SVG.Svg();

      parentSVGDocDeterminer.determineFor = () => svgDoc;

      baseNumbering.appendTo = jest.fn();

      parentSVGDocEnsurer.ensureFor({ baseNumbering, svgDoc });

      expect(baseNumbering.appendTo).not.toHaveBeenCalled();
    });
  });
});
