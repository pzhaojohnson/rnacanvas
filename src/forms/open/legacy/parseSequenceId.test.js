import * as fs from 'fs';

import { parseSequenceId } from './parseSequenceId';

function readDrawingFile(drawingName) {
  let drawingFilePath = (
    'src/forms/open/legacy/test-inputs/'
    + drawingName
    + '.rna2drawer'
  );

  return fs.readFileSync(drawingFilePath, 'utf8');
}

describe('parseSequenceId function', () => {
  test('a valid sequence ID', () => {
    let drawingFileContents = readDrawingFile('valid-sequence-id');
    let sequenceId = parseSequenceId({ drawingFileContents });
    expect(sequenceId).toBe('AsdfQwer  Zxcv');
  });

  test('missing sequence ID value', () => {
    let drawingFileContents = readDrawingFile('missing-sequence-id-value');
    let sequenceId = parseSequenceId({ drawingFileContents });
    expect(sequenceId).toBeUndefined();
  });

  test('missing leading angle bracket', () => {
    let drawingFileContents = readDrawingFile('missing-leading-angle-bracket');
    let sequenceId = parseSequenceId({ drawingFileContents });
    expect(sequenceId).toBe('AsdfQwer  Zxcv');
  });

  test('an empty drawing file', () => {
    let drawingFileContents = readDrawingFile('empty');
    let sequenceId = parseSequenceId({ drawingFileContents });
    expect(sequenceId).toBeUndefined();
  });
});
