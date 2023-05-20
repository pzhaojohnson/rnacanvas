import * as fs from 'fs';

import * as path from 'path';

import { LabelLineWrapper } from './LabelLineWrapper';

let exampleLabelLineFileNames = [
  'labelLine1.json',
];

let exampleLabelLines = {};

exampleLabelLineFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-label-lines', fileName);
  let fileExtension = path.extname(fileName);
  let labelLineName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleLabelLines[labelLineName] = JSON.parse(json);
});

describe('LabelLineWrapper class', () => {
  it('stores wrapped label line in wrappee property', () => {
    let wrappee = exampleLabelLines.labelLine1;
    expect(wrappee).toBeTruthy();
    let wrapper = new LabelLineWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });
});
