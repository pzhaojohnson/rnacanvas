import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import * as fs from 'fs';

import { AppWrapper } from './openJSONDrawing';

let drawingNames = [
  'drawing-paddings',
  'base-highlightings',
  'invalid-json',
  'empty',
  'no-bases',
  'hairpin',
  'two-hairpins',
  'three-hairpins',
  'base-outlines',
  'tertiary-bonds',
];

let drawingStrings = {};

drawingNames.forEach(drawingName => {
  let drawingFilePath = (
    'src/forms/open/test-inputs/json-drawings/'
    + drawingName
    + '.rnacanvas'
  );

  drawingStrings[drawingName] = fs.readFileSync(drawingFilePath, 'utf8');
});

let app = null;
let appWrapper = null;

beforeEach(() => {
  app = new App({ SVG });
  app.appendTo(document.body);

  appWrapper = new AppWrapper(app);
});

afterEach(() => {
  appWrapper = null;

  app.remove();
  app = null;
});

describe('AppWrapper class', () => {
  test('app property', () => {
    let app = new App({ SVG });
    let appWrapper = new AppWrapper(app);
    expect(appWrapper.app).toBe(app);
  });

  describe('openJSONDrawing method', () => {
    it('adjusts drawing padding to the current screen', () => {
      let drawingString = drawingStrings['drawing-paddings'];
      appWrapper.openJSONDrawing({ drawingString });

      let prevWidth = app.strictDrawing.drawing.width;
      let prevHeight = app.strictDrawing.drawing.height;

      app.strictDrawing.updateLayout();

      // should not have changed if drawing padding was already adjusted
      expect(app.strictDrawing.drawing.width).toBe(prevWidth);
      expect(app.strictDrawing.drawing.height).toBe(prevHeight);

      expect(prevWidth).toBeGreaterThan(0);
      expect(prevHeight).toBeGreaterThan(0);
    });

    it('removes lingering base highlightings', () => {
      // the first and third bases have highlightings
      let drawingString = drawingStrings['base-highlightings'];
      appWrapper.openJSONDrawing({ drawingString });

      app.drawing.bases().forEach(
        b => expect(b.highlighting).toBeFalsy()
      );
    });

    it('throws for invalid JSON', () => {
      let drawingString = drawingStrings['invalid-json'];

      // JSON is invalid
      expect(() => JSON.parse(drawingString)).toThrow();

      expect(
        () => appWrapper.openJSONDrawing({ drawingString })
      ).toThrow();
    });

    test('an empty drawing string', () => {
      let drawingString = drawingStrings['empty'];

      // this behavior is not firmly defined
      expect(
        () => appWrapper.openJSONDrawing({ drawingString })
      ).toThrow();
    });

    test('a drawing with no bases', () => {
      let drawingString = drawingStrings['no-bases'];

      // this behavior is not firmly defined
      expect(
        () => appWrapper.openJSONDrawing({ drawingString })
      ).not.toThrow();

      expect(app.drawing.bases().length).toBe(0);
    });

    it('remembers bases', () => {
      let drawingString = drawingStrings['hairpin'];
      appWrapper.openJSONDrawing({ drawingString });

      let characters = app.drawing.bases().map(b => b.text.text()).join('');
      expect(characters).toBe('UCGGCCAACAGCAUCGGUUGGCCAA');
    });

    it('remembers base outlines', () => {
      let drawingString = drawingStrings['base-outlines'];
      appWrapper.openJSONDrawing({ drawingString });

      let bases = app.drawing.bases();
      let baseOutlines = bases.map(b => b.outline);

      // remove undefined values
      baseOutlines = baseOutlines.filter(bo => bo);

      expect(baseOutlines.length).toBe(6);

      let outlinedPositions = [34, 142, 168, 297, 317, 467];

      outlinedPositions.forEach(p => {
        let b = bases[p - 1];
        expect(b.outline).toBeTruthy();
      });
    });

    it('remembers primary bonds', () => {
      let drawingString = drawingStrings['hairpin'];
      appWrapper.openJSONDrawing({ drawingString });

      let bases = app.drawing.bases();
      let primaryBonds = app.drawing.primaryBonds;

      expect(bases.length).toBe(25);
      expect(primaryBonds.length).toBe(24);

      for (let i = 0; i < 24; i++) {
        let b1 = bases[i];
        let b2 = bases[i + 1];
        let pb = primaryBonds.find(pb => pb.binds(b1) && pb.binds(b2));
        expect(pb).toBeTruthy();
      }
    });

    it('remembers secondary bonds', () => {
      let drawingString = drawingStrings['two-hairpins'];
      appWrapper.openJSONDrawing({ drawingString });

      let bases = app.drawing.bases();
      let secondaryBonds = app.drawing.secondaryBonds;

      expect(secondaryBonds.length).toBe(13);

      let basePairs = [
        [bases[2], bases[22]],
        [bases[3], bases[21]],
        [bases[4], bases[20]],
        [bases[5], bases[19]],
        [bases[6], bases[18]],
        [bases[7], bases[17]],
        [bases[8], bases[16]],
        [bases[30], bases[53]],
        [bases[31], bases[52]],
        [bases[32], bases[50]],
        [bases[33], bases[49]],
        [bases[36], bases[48]],
        [bases[37], bases[47]],
      ];

      basePairs.forEach(bp => {
        let sb = secondaryBonds.find(sb => sb.binds(bp[0]) && sb.binds(bp[1]));
        expect(sb).toBeTruthy();
      });
    });

    it('remembers tertiary bonds', () => {
      let drawingString = drawingStrings['tertiary-bonds'];
      appWrapper.openJSONDrawing({ drawingString });

      let bases = app.drawing.bases();
      let tertiaryBonds = app.drawing.tertiaryBonds;

      expect(tertiaryBonds.length).toBe(6);

      let basePairs = [
        [bases[6], bases[31]],
        [bases[7], bases[30]],
        [bases[82], bases[126]],
        [bases[85], bases[123]],
        [bases[255], bases[283]],
        [bases[257], bases[281]],
      ];

      basePairs.forEach(bp => {
        let tb = tertiaryBonds.find(tb => tb.binds(bp[0]) && tb.binds(bp[1]));
        expect(tb).toBeTruthy();
      });
    });

    it('remembers base numberings', () => {
      let drawingString = drawingStrings['three-hairpins'];
      appWrapper.openJSONDrawing({ drawingString });

      let bases = app.drawing.bases();
      let baseNumberings = bases.map(b => b.numbering);

      // remove undefined values
      baseNumberings = baseNumberings.filter(bn => bn);

      expect(baseNumberings.length).toBe(8);

      // check that numberings are attached to the right bases
      expect(bases[2].numbering.text.text()).toBe('3');
      expect(bases[19].numbering.text.text()).toBe('20');
      expect(bases[28].numbering.text.text()).toBe('29');
      expect(bases[39].numbering.text.text()).toBe('400');
      expect(bases[59].numbering.text.text()).toBe('60');
      expect(bases[79].numbering.text.text()).toBe('80');
      expect(bases[92].numbering.text.text()).toBe('-125');
      expect(bases[99].numbering.text.text()).toBe('100');
    });
  });
});
