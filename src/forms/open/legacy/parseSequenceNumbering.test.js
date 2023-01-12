import * as fs from 'fs';

import { parseSequenceNumbering } from './parseSequenceNumbering';

function readDrawingFile(drawingName) {
  let drawingFilePath = (
    'src/forms/open/legacy/test-inputs/'
    + drawingName
    + '.rna2drawer'
  );

  return fs.readFileSync(drawingFilePath, 'utf8');
}

describe('parseSequenceNumbering function', () => {
  test('valid sequence numbering values', () => {
    let drawingName = 'valid-sequence-numbering-values';
    let drawingFileContents = readDrawingFile(drawingName);
    let sequenceNumbering = parseSequenceNumbering({ drawingFileContents });

    expect(sequenceNumbering.offset).toBe(-58);
    expect(sequenceNumbering.increment).toBe(6);
    expect(sequenceNumbering.anchor).toBe(82);
  });

  test('negative sequence numbering increment', () => {
    let drawingName = 'negative-sequence-numbering-increment';
    let drawingFileContents = readDrawingFile(drawingName);
    let sequenceNumbering = parseSequenceNumbering({ drawingFileContents });

    expect(sequenceNumbering.offset).toBe(23);
    expect(sequenceNumbering.increment).toBeUndefined();
    expect(sequenceNumbering.anchor).toBe(-12);
  });

  test('non-numeric sequence numbering values', () => {
    let drawingName = 'non-numeric-sequence-numbering-values';
    let drawingFileContents = readDrawingFile(drawingName);
    let sequenceNumbering = parseSequenceNumbering({ drawingFileContents });

    expect(sequenceNumbering.offset).toBeUndefined();
    expect(sequenceNumbering.increment).toBeUndefined();
    expect(sequenceNumbering.anchor).toBeUndefined();
  });

  test('missing sequence numbering values', () => {
    let drawingName = 'missing-sequence-numbering-values';
    let drawingFileContents = readDrawingFile(drawingName);
    let sequenceNumbering = parseSequenceNumbering({ drawingFileContents });

    expect(sequenceNumbering.offset).toBeUndefined();
    expect(sequenceNumbering.increment).toBeUndefined();
    expect(sequenceNumbering.anchor).toBeUndefined();
  });

  test('missing sequence numbering lines', () => {
    let drawingName = 'missing-sequence-numbering-lines';
    let drawingFileContents = readDrawingFile(drawingName);
    let sequenceNumbering = parseSequenceNumbering({ drawingFileContents });

    expect(sequenceNumbering.offset).toBeUndefined();
    expect(sequenceNumbering.increment).toBeUndefined();
    expect(sequenceNumbering.anchor).toBeUndefined();
  });
});
