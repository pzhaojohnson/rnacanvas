import * as fs from 'fs';

import { parseSequence } from './parseSequence';

function readDrawingFile(drawingName) {
  let drawingFilePath = (
    'src/forms/open/legacy/test-inputs/'
    + drawingName
    + '.rna2drawer'
  );

  return fs.readFileSync(drawingFilePath, 'utf8');
}

describe('parseSequence function', () => {
  test('a nonempty sequence', () => {
    let drawingFileContents = readDrawingFile('nonempty-sequence');
    let sequence = parseSequence({ drawingFileContents });
    expect(sequence).toBe('AAGGCCUUAGCUAA');
  });

  test('an empty sequence', () => {
    let drawingFileContents = readDrawingFile('empty-sequence');
    let sequence = parseSequence({ drawingFileContents });
    expect(sequence).toBe('');
  });

  test('missing sequence line', () => {
    let drawingFileContents = readDrawingFile('missing-sequence-line');
    let sequence = parseSequence({ drawingFileContents });
    expect(sequence).toBeUndefined();
  });

  test('an empty file', () => {
    let drawingFileContents = readDrawingFile('empty');
    let sequence = parseSequence({ drawingFileContents });
    expect(sequence).toBeUndefined();
  });
});
