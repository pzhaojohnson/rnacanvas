import * as fs from 'fs';

import { isNullish } from 'Values/isNullish';

import { parseLegacyDrawing } from './parseLegacyDrawing';

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

describe('parseLegacyDrawing function', () => {
  it('parses sequence ID', () => {
    let drawingFileContents = readDrawingFile('hairpin');
    let data = parseLegacyDrawing({ drawingFileContents });
    expect(data.sequenceId).toBe('AsdfQwer  Zxcv');
  });

  it('parses sequence', () => {
    let drawingFileContents = readDrawingFile('hairpin');
    let data = parseLegacyDrawing({ drawingFileContents });
    expect(data.sequence).toBe('AAGGCCUUAGCUAA');
  });

  it('parses secondary structure', () => {
    let drawingFileContents = readDrawingFile('hairpin');
    let data = parseLegacyDrawing({ drawingFileContents });

    let { partnersNotation } = data.secondaryStructure;

    expect(partnersNotation.length).toBe(14);

    expect(
      partnersNotation.some(value => !isNullish(value))
    ).toBeTruthy();
  });

  it('parses tertiary interactions', () => {
    let drawingFileContents = readDrawingFile('three-tertiary-interactions');
    let data = parseLegacyDrawing({ drawingFileContents });

    expect(data.tertiaryInteractions.length).toBe(3);

    data.tertiaryInteractions.forEach(ti => {
      expect(isNullish(ti)).toBeFalsy();
    });
  });

  it('parses sequence numbering', () => {
    let drawingName = 'valid-sequence-numbering-values';
    let drawingFileContents = readDrawingFile(drawingName);
    let data = parseLegacyDrawing({ drawingFileContents });

    expect(data.sequenceNumbering.offset).toBe(-58);
    expect(data.sequenceNumbering.increment).toBe(6);
    expect(data.sequenceNumbering.anchor).toBe(82);
  });

  it('parses base text colors', () => {
    let drawingFileContents = readDrawingFile('six-base-text-colors');
    let data = parseLegacyDrawing({ drawingFileContents });

    expect(data.baseTextColors.length).toBe(6);

    data.baseTextColors.forEach(color => {
      expect(isNullish(color)).toBeFalsy();
    });
  });

  it('parses base outlines', () => {
    let drawingFileContents = readDrawingFile('three-base-outlines');
    let data = parseLegacyDrawing({ drawingFileContents });

    expect(data.baseOutlines.length).toBe(3);

    data.baseOutlines.forEach(bo => {
      expect(isNullish(bo)).toBeFalsy();
    });
  });
});
