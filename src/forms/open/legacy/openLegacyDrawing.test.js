import { App } from 'App';

import * as SVG from 'Draw/svg/NodeSVG';

import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

import { round } from 'Math/round';

import { normalizeAngle } from 'Math/angles/normalizeAngle';

import * as fs from 'fs';

import { AppWrapper } from './openLegacyDrawing';

let colors = {
  'black': 'rgb(0, 0, 0)',
  'red': 'rgb(255, 0, 0)',
  'green': 'rgb(0, 255, 0)',
  'blue': 'rgb(0, 0, 255)',
  'cyan': 'rgb(0, 255, 255)',
  'orange': 'rgb(255, 165, 0)',
  'gold': 'rgb(255, 215, 0)',
  'darkcyan': 'rgb(0, 139, 139)',
  'lightcyan': 'rgb(224, 255, 255)',
  'lightyellow': 'rgb(255, 255, 224)',
};

// seems necessary to process CSS color names on Node.js
Object.defineProperty(window, 'getComputedStyle', {
  value: ele => ({ color: colors[ele.style.color] }),
});

function readDrawingFile(drawingName) {
  let drawingFilePath = (
    'src/forms/open/legacy/test-inputs/'
    + drawingName
    + '.rna2drawer'
  );

  return fs.readFileSync(drawingFilePath, 'utf8');
}

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
    expect(appWrapper.app).toBe(app);
  });

  test('drawing getter', () => {
    expect(appWrapper.drawing.drawing).toBe(app.drawing);
  });

  describe('openLegacyDrawing method', () => {
    test('empty drawing file contents', () => {
      let drawingFileContents = readDrawingFile('empty');
      expect(drawingFileContents.length).toBe(0);

      expect(
        () => appWrapper.openLegacyDrawing({ drawingFileContents })
      ).toThrow();
    });

    test('empty sequence', () => {
      let drawingFileContents = readDrawingFile('empty-sequence');

      expect(
        () => appWrapper.openLegacyDrawing({ drawingFileContents })
      ).toThrow();
    });

    it('appends sequence', () => {
      let drawingFileContents = readDrawingFile('hairpin');
      appWrapper.openLegacyDrawing({ drawingFileContents });

      expect(app.drawing.sequences.length).toBe(1);
      let sequence = app.drawing.sequences[0];

      expect(sequence.id).toBe('AsdfQwer  Zxcv');

      let characters = sequence.bases.map(b => b.text.text()).join('');
      expect(characters).toBe('AAGGCCUUAGCUAA');
    });

    test('missing sequence ID', () => {
      let drawingName = 'missing-sequence-id-value';
      let drawingFileContents = readDrawingFile(drawingName);
      appWrapper.openLegacyDrawing({ drawingFileContents });

      expect(app.drawing.sequences.length).toBe(1);
      let sequence = app.drawing.sequences[0];

      expect(sequence.id).toBe('Unnamed Structure');
    });

    it('adds secondary bonds', () => {
      let drawingFileContents = readDrawingFile('hairpin');
      appWrapper.openLegacyDrawing({ drawingFileContents });

      let secondaryBonds = app.drawing.secondaryBonds;
      let bases = app.drawing.bases();

      [[1, 12], [2, 11], [3, 10], [4, 9]].forEach(pair => {
        let b1 = bases[pair[0] - 1];
        let b2 = bases[pair[1] - 1];
        expect(b1).toBeTruthy();
        expect(b2).toBeTruthy();

        let sb = secondaryBonds.find(sb => sb.binds(b1) && sb.binds(b2));
        expect(sb).toBeTruthy();
      });
    });

    it('draws tertiary interactions', () => {
      let drawingName = 'three-tertiary-interactions';
      let drawingFileContents = readDrawingFile(drawingName);
      appWrapper.openLegacyDrawing({ drawingFileContents });

      let tertiaryBonds = app.drawing.tertiaryBonds;
      let bases = app.drawing.bases();

      // just check some pairs
      [[5, 16], [7, 14], [12, 7], [1, 10], [2, 9]].forEach(pair => {
        let b1 = bases[pair[0] - 1];
        let b2 = bases[pair[1] - 1];
        expect(b1).toBeTruthy();
        expect(b2).toBeTruthy();

        let tb = tertiaryBonds.find(tb => tb.binds(b1) && tb.binds(b2));
        expect(tb).toBeTruthy();
      });
    });

    it('numbers bases', () => {
      let drawingName = 'valid-sequence-numbering-values';
      let drawingFileContents = readDrawingFile(drawingName);
      appWrapper.openLegacyDrawing({ drawingFileContents });

      // just check some base numberings
      let bases = app.drawing.bases();
      expect(bases[81].numbering.text.text()).toBe('24');
      expect(bases[87].numbering.text.text()).toBe('30');
      expect(bases[99].numbering.text.text()).toBe('42');
      expect(bases[75].numbering.text.text()).toBe('18');
      expect(bases[57].numbering.text.text()).toBe('0');
    });

    it('orients base numberings', () => {
      let drawingName = 'valid-sequence-numbering-values';
      let drawingFileContents = readDrawingFile(drawingName);
      appWrapper.openLegacyDrawing({ drawingFileContents });

      let bases = app.drawing.bases();
      let numberedBases = [bases[81], bases[93], bases[57]];

      let prevLineAngles = numberedBases.map(
        b => round(normalizeAngle(b.numbering.lineAngle), 6)
      );

      orientBaseNumberings(app.drawing.drawing);

      let currLineAngles = numberedBases.map(
        b => round(normalizeAngle(b.numbering.lineAngle), 6)
      );

      // should not have changed if were already oriented
      expect(currLineAngles).toEqual(prevLineAngles);
    });

    it('colors bases', () => {
      let drawingFileContents = readDrawingFile('six-base-text-colors');
      appWrapper.openLegacyDrawing({ drawingFileContents });

      let bases = app.drawing.bases();
      expect(bases.length).toBe(6);

      expect(bases[0].text.attr('fill')).toBe('#000000');
      expect(bases[1].text.attr('fill')).toBe('#0000ff');
      expect(bases[2].text.attr('fill')).toBe('#ffd700');
      expect(bases[3].text.attr('fill')).toBe('#00ffff');
      expect(bases[4].text.attr('fill')).toBe('#00ffff');
      expect(bases[5].text.attr('fill')).toBe('#ffffe0');
    });

    it('outlines bases', () => {
      let drawingFileContents = readDrawingFile('four-base-outlines');
      appWrapper.openLegacyDrawing({ drawingFileContents });

      let bases = app.drawing.bases();
      expect(bases.length).toBe(6);

      expect(bases[0].outline).toBeFalsy();
      expect(bases[1].outline).toBeTruthy();
      expect(bases[2].outline).toBeTruthy();
      expect(bases[3].outline).toBeTruthy();
      expect(bases[4].outline).toBeFalsy();
      expect(bases[5].outline).toBeTruthy();
    });
  });
});
