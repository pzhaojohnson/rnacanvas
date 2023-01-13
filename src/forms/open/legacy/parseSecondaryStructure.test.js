import * as fs from 'fs';

import { isNullish } from 'Values/isNullish';

import { parseSecondaryStructure } from './parseSecondaryStructure';

function readDrawingFile(drawingName) {
  let drawingFilePath = (
    'src/forms/open/legacy/test-inputs/'
    + drawingName
    + '.rna2drawer'
  );

  return fs.readFileSync(drawingFilePath, 'utf8');
}

describe('parseSecondaryStructure function', () => {
  test('a valid secondary structure', () => {
    let drawingName = 'valid-secondary-structure';
    let drawingFileContents = readDrawingFile(drawingName);
    let secondaryStructure = parseSecondaryStructure({ drawingFileContents });
    let { partnersNotation } = secondaryStructure;

    expect(partnersNotation.length).toBe(14);

    [[1, 12], [2, 11], [3, 10], [4, 9]].forEach(pair => {
      expect(partnersNotation[pair[0] - 1]).toBe(pair[1]);
      expect(partnersNotation[pair[1] - 1]).toBe(pair[0]);
    });

    [5, 6, 7, 8, 13, 14].forEach(position => {
      expect(isNullish(partnersNotation[position - 1])).toBeTruthy();
    });
  });

  test('an invalid secondary structure', () => {
    let drawingName = 'invalid-secondary-structure';
    let drawingFileContents = readDrawingFile(drawingName);
    let secondaryStructure = parseSecondaryStructure({ drawingFileContents });
    expect(secondaryStructure).toBeUndefined();
  });

  test('empty secondary structure line', () => {
    let drawingName = 'empty-secondary-structure-line';
    let drawingFileContents = readDrawingFile(drawingName);
    let secondaryStructure = parseSecondaryStructure({ drawingFileContents });
    expect(secondaryStructure).toStrictEqual({ partnersNotation: [] });
  });

  test('missing secondary structure line', () => {
    let drawingName = 'missing-secondary-structure-line';
    let drawingFileContents = readDrawingFile(drawingName);
    let secondaryStructure = parseSecondaryStructure({ drawingFileContents });
    expect(secondaryStructure).toBeUndefined();
  });

  test('an empty drawing file', () => {
    let drawingFileContents = readDrawingFile('empty');
    let secondaryStructure = parseSecondaryStructure({ drawingFileContents });
    expect(secondaryStructure).toBeUndefined();
  });
});
