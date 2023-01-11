import * as fs from 'fs';

import { parseBaseOutlines } from './parseBaseOutlines';

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

// seems to be necessary for CSS color names to be processed on Node.js
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

describe('parseBaseOutlines function', () => {
  test('zero base outlines', () => {
    let drawingFileContents = readDrawingFile('zero-base-outlines');
    let parsed = parseBaseOutlines({ drawingFileContents });
    expect(parsed.length).toBe(0);
  });

  test('one base outline', () => {
    let drawingFileContents = readDrawingFile('one-base-outline');
    let parsed = parseBaseOutlines({ drawingFileContents });

    expect(parsed.length).toBe(1);

    let bo = parsed[0];
    expect(bo.stroke.toHex().toLowerCase()).toBe('#008b8b');
    expect(bo.fill.toHex().toLowerCase()).toBe('#e0ffff');
  });

  test('three base outlines', () => {
    let drawingFileContents = readDrawingFile('three-base-outlines');
    let parsed = parseBaseOutlines({ drawingFileContents });

    expect(parsed.length).toBe(3);

    let bo1 = parsed[0];
    expect(bo1.stroke.toHex().toLowerCase()).toBe('#008b8b');
    expect(bo1.fill.toHex().toLowerCase()).toBe('#e0ffff');

    let bo2 = parsed[1];
    expect(bo2.stroke.toHex().toLowerCase()).toBe('#ffa500');
    expect(bo2.fill).toBeUndefined();

    let bo3 = parsed[2];
    expect(bo3.stroke).toBeUndefined();
    expect(bo3.fill.toHex().toLowerCase()).toBe('#ffffe0');
  });

  test('an invalid base outline spec', () => {
    // is missing fill color name
    let drawingFileContents = readDrawingFile('invalid-base-outline-spec');
    let parsed = parseBaseOutlines({ drawingFileContents });

    expect(parsed.length).toBe(1);

    // stroke color can still be parsed in this case
    let bo = parsed[0];
    expect(bo.stroke.toHex().toLowerCase()).toBe('#008b8b');
    expect(bo.fill).toBeUndefined();
  });

  test('missing base outlines line', () => {
    let drawingFileContents = readDrawingFile('missing-base-outlines-line');
    let parsed = parseBaseOutlines({ drawingFileContents });
    expect(parsed).toStrictEqual([]);
  });
});
