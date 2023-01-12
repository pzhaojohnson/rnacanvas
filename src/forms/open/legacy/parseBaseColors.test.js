import * as fs from 'fs';

import { parseBaseColors } from './parseBaseColors';

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

describe('parseBaseColors function', () => {
  test('zero base colors', () => {
    let drawingFileContents = readDrawingFile('zero-base-colors');
    let baseColors = parseBaseColors({ drawingFileContents });
    expect(baseColors).toStrictEqual([]);
  });

  test('one base color', () => {
    let drawingFileContents = readDrawingFile('one-base-color');
    let baseColors = parseBaseColors({ drawingFileContents });

    expect(baseColors.length).toBe(1);
    expect(baseColors[0].toHex().toLowerCase()).toBe('#ffd700');
  });

  test('six base colors', () => {
    let drawingFileContents = readDrawingFile('six-base-colors');
    let baseColors = parseBaseColors({ drawingFileContents });

    expect(baseColors.length).toBe(6);

    expect(baseColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[1].toHex().toLowerCase()).toBe('#0000ff');
    expect(baseColors[2].toHex().toLowerCase()).toBe('#ffd700');
    expect(baseColors[3].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseColors[4].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseColors[5].toHex().toLowerCase()).toBe('#ffffe0');
  });

  test('invalid base color names', () => {
    let drawingFileContents = readDrawingFile('invalid-base-color-names');
    let baseColors = parseBaseColors({ drawingFileContents });

    expect(baseColors.length).toBe(6);

    // the SVG.Color constructor seems to default to black
    expect(baseColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[1].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[2].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[3].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[4].toHex().toLowerCase()).toBe('#00ffff');
    expect(baseColors[5].toHex().toLowerCase()).toBe('#000000');
  });

  test('missing base colors', () => {
    let drawingFileContents = readDrawingFile('missing-base-colors');
    let baseColors = parseBaseColors({ drawingFileContents });

    expect(baseColors.length).toBe(6);

    expect(baseColors[0].toHex().toLowerCase()).toBe('#000000');
    expect(baseColors[1]).toBeUndefined();
    expect(baseColors[2].toHex().toLowerCase()).toBe('#ffd700');
    expect(baseColors[3]).toBeUndefined();
    expect(baseColors[4]).toBeUndefined();
    expect(baseColors[5].toHex().toLowerCase()).toBe('#ffffe0');
  });

  test('missing base colors line', () => {
    let drawingFileContents = readDrawingFile('missing-base-colors-line');
    let baseColors = parseBaseColors({ drawingFileContents });
    expect(baseColors).toStrictEqual([]);
  });
});
