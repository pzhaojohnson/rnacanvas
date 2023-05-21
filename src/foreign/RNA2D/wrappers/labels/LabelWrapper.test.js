import * as fs from 'fs';

import * as path from 'path';

import { LabelWrapper } from './LabelWrapper';

let exampleLabelFileNames = [
  'label1.json',
  'label2.json',
  'notNumbering.json',
];

let exampleLabels = {};

exampleLabelFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-labels', fileName);
  let fileExtension = path.extname(fileName);
  let labelName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleLabels[labelName] = JSON.parse(json);
});

describe('LabelWrapper class', () => {
  it('stores wrapped label in wrappee property', () => {
    let wrappee = exampleLabels.label1;
    expect(wrappee).toBeTruthy();
    let wrapper = new LabelWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });
});
