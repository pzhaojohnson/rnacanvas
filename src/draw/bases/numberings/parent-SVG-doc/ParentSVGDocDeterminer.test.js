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
      baseNumbering.text.root = () => 'SVG doc - 2398r2983hiwedhj';
      baseNumbering.line.root = () => null;

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });

    test('only the line element is in an SVG doc', () => {
      baseNumbering.text.root = () => null;
      baseNumbering.line.root = () => 'SVG doc - 98iudshfjkd';

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });

    test('text and line elements are in the same SVG doc', () => {
      baseNumbering.text.root = () => 'SVG doc - 238ur23hiwfejsd';
      baseNumbering.line.root = () => 'SVG doc - 238ur23hiwfejsd';

      expect(determiner.determineFor(baseNumbering)).toBe(
        'SVG doc - 238ur23hiwfejsd'
      );
    });

    test('text and line elements are in different SVG docs', () => {
      baseNumbering.text.root = () => 'SVG doc - 1';
      baseNumbering.line.root = () => 'SVG doc - 2';

      expect(determiner.determineFor(baseNumbering)).toBeUndefined();
    });
  });
});
