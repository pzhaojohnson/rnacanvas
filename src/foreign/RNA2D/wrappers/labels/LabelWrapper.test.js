import * as fs from 'fs';

import * as path from 'path';

import { LabelContentWrapper } from './contents/LabelContentWrapper';

import { LabelLineWrapper } from './lines/LabelLineWrapper';

import { LabelWrapper } from './LabelWrapper';

let exampleLabelFileNames = [
  'label1.json',
  'label2.json',
  'anAsterisk.json',
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

  test('labelContent getter', () => {
    let l = new LabelWrapper(exampleLabels.label2);
    let labelContent = l.labelContent;
    expect(labelContent instanceof LabelContentWrapper).toBeTruthy();

    // just check some label content properties
    expect(labelContent.label).toBe('20');
    expect(labelContent.wrappee.x).toBe(10.891190936339669);
  });

  test('labelLine getter', () => {
    let l = new LabelWrapper(exampleLabels.label2);
    let labelLine = l.labelLine;
    expect(labelLine instanceof LabelLineWrapper).toBeTruthy();

    // just check some label line properties
    expect(labelLine.classes).toStrictEqual(['numbering-line', 'sequential']);
    expect(labelLine.wrappee.x1).toBe(11.37431758133793);
  });

  test('residueIndex getter', () => {
    let l1 = new LabelWrapper(exampleLabels.label1);
    let l2 = new LabelWrapper(exampleLabels.label2);
    expect(l1.residueIndex).toBe(50);
    expect(l2.residueIndex).toBe(20);
  });
});
