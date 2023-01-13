import * as fs from 'fs';

import { parseTertiaryInteractions } from './parseTertiaryInteractions';

let colors = {
  'black': 'rgb(0, 0, 0)',
  'red': 'rgb(255, 0, 0)',
  'green': 'rgb(0, 255, 0)',
  'blue': 'rgb(0, 0, 255)',
  'cyan': 'rgb(0, 255, 255)',
  'orange': 'rgb(255, 165, 0)',
  'gold': 'rgb(255, 215, 0)',
  'lightyellow': 'rgb(255, 255, 224)',
};

// seems to be necessary for the parseTertiaryInteraction function to
// work on Node.js
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

describe('parseTertiaryInteractions function', () => {
  test('zero tertiary interactions', () => {
    let drawingFileContents = readDrawingFile('zero-tertiary-interactions');
    let parsed = parseTertiaryInteractions({ drawingFileContents });
    expect(parsed).toStrictEqual([]);
  });

  test('one tertiary interaction', () => {
    let drawingFileContents = readDrawingFile('one-tertiary-interaction');
    let parsed = parseTertiaryInteractions({ drawingFileContents });

    expect(parsed.length).toBe(1);

    let ti1 = parsed[0];
    expect(ti1.side1).toEqual({ start: 5, end: 7 });
    expect(ti1.side2).toEqual({ start: 14, end: 16 });
    expect(ti1.color.toHex().toLowerCase()).toBe('#ffd700');
  });

  test('three tertiary interactions', () => {
    let drawingFileContents = readDrawingFile('three-tertiary-interactions');
    let parsed = parseTertiaryInteractions({ drawingFileContents });

    expect(parsed.length).toBe(3);

    let ti1 = parsed[0];
    expect(ti1.side1).toEqual({ start: 5, end: 7 });
    expect(ti1.side2).toEqual({ start: 14, end: 16 });
    expect(ti1.color.toHex().toLowerCase()).toBe('#ffd700');

    let ti2 = parsed[1];
    expect(ti2.side1).toEqual({ start: 11, end: 13 });
    expect(ti2.side2).toEqual({ start: 6, end: 8 });
    expect(ti2.color.toHex().toLowerCase()).toBe('#ffa500');

    let ti3 = parsed[2];
    expect(ti3.side1).toEqual({ start: 1, end: 2 });
    expect(ti3.side2).toEqual({ start: 9, end: 10 });
    expect(ti3.color.toHex().toLowerCase()).toBe('#00ffff');
  });

  test('an invalid tertiary interaction', () => {
    let drawingFileContents = readDrawingFile('invalid-tertiary-interaction');
    let parsed = parseTertiaryInteractions({ drawingFileContents });
    expect(parsed).toEqual([undefined]);
  });

  test('missing tertiary interactions line', () => {
    let drawingName = 'missing-tertiary-interactions-line';
    let drawingFileContents = readDrawingFile(drawingName);
    let parsed = parseTertiaryInteractions({ drawingFileContents });
    expect(parsed).toStrictEqual([]);
  });
});
