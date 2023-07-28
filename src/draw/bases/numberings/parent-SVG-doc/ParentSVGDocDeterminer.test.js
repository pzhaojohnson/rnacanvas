import * as SVG from '@svgdotjs/svg.js';

import { ParentSVGDocDeterminer } from './ParentSVGDocDeterminer';

function createBaseNumberingMock() {
  return {
    text: { root: () => null },
    line: { root: () => null },
  };
}

let determiner = null;

let baseNumbering = null;

beforeEach(() => {
  determiner = new ParentSVGDocDeterminer();

  baseNumbering = createBaseNumberingMock();
});

afterEach(() => {
  baseNumbering = null;

  determiner = null;
});

describe('ParentSVGDocDeterminer class', () => {
  describe('determineFor method', () => {
    test('neither the text nor line elements are in an SVG doc', () => {
      baseNumbering.text.root = () => null;
      baseNumbering.line.root = () => null;

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });

    test('only the text element is in an SVG doc', () => {
      baseNumbering.text.root = () => new SVG.Svg();
      baseNumbering.line.root = () => null;

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });

    test('only the line element is in an SVG doc', () => {
      baseNumbering.text.root = () => null;
      baseNumbering.line.root = () => new SVG.Svg();

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });

    test('text and line elements are in the same SVG doc', () => {
      let svgDoc = new SVG.Svg();

      baseNumbering.text.root = () => svgDoc;
      baseNumbering.line.root = () => svgDoc;

      expect(determiner.determineFor(baseNumbering)).toBe(svgDoc);

      // double-check
      expect(svgDoc).toBeTruthy();
    });

    test('text and line elements are in different SVG docs', () => {
      baseNumbering.text.root = () => new SVG.Svg();
      baseNumbering.line.root = () => new SVG.Svg();

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });
  });
});
