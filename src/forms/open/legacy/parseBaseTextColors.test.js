import * as fs from 'fs';

import { parseBaseTextColors } from './parseBaseTextColors';

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

// seems to be necessary to process CSS color names on Node.js
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

describe('parseBaseTextColors function', () => {
  test('zero base text colors', () => {
    let drawingFileContents = readDrawingFile('zero-base-text-colors');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });
    expect(baseTextColors).toStrictEqual([]);
  });

  test('one base text color', () => {
    let drawingFileContents = readDrawingFile('one-base-text-color');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });

    expect(baseTextColors.length).toBe(1);
    expect(baseTextColors[0].toHex().toLowerCase()).toBe('#ffd700');
  });

  test('six base text colors', () => {
    let drawingFileContents = readDrawingFile('six-base-text-colors');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });

    expect(baseTextColors.length).toBe(6);

    expect(baseTextColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[1].toHex().toLowerCase()).toBe('#0000ff');
    expect(baseTextColors[2].toHex().toLowerCase()).toBe('#ffd700');
    expect(baseTextColors[3].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseTextColors[4].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseTextColors[5].toHex().toLowerCase()).toBe('#ffffe0');
  });

  test('invalid base text color names', () => {
    let drawingFileContents = readDrawingFile('invalid-base-text-color-names');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });

    expect(baseTextColors.length).toBe(6);

    // the SVG.Color constructor seems to default to black
    expect(baseTextColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[1].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[2].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[3].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[4].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseTextColors[5].toHex().toLowerCase()).toBe('#000000');
  });

  test('missing base text colors', () => {
    let drawingFileContents = readDrawingFile('missing-base-text-colors');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });

    expect(baseTextColors.length).toBe(6);

    expect(baseTextColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseTextColors[1]).toBeUndefined();
    expect(baseTextColors[2].toHex().toLowerCase()).toBe('#ffd700');
    expect(baseTextColors[3]).toBeUndefined();
    expect(baseTextColors[4]).toBeUndefined();
    expect(baseTextColors[5].toHex().toLowerCase()).toBe('#ffffe0');
  });

  test('missing base text colors line', () => {
    let drawingFileContents = readDrawingFile('missing-base-text-colors-line');
    let baseTextColors = parseBaseTextColors({ drawingFileContents });
    expect(baseTextColors).toStrictEqual([]);
  });
});
