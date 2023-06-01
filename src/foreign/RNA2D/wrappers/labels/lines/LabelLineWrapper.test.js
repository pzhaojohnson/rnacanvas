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

  test('classes getter', () => {
    let ll = new LabelLineWrapper(exampleLabelLines.labelLine1);
    expect(ll.classes).toStrictEqual(['numbering-line', 'sequential']);
  });

  test('x1, y1, x2 and y2 getters', () => {
    let ll = new LabelLineWrapper(exampleLabelLines.labelLine1);
    expect(ll.x1).toBe(89.88221392499634);
    expect(ll.y1).toBe(74.6386868236346);
    expect(ll.x2).toBe(90.11622910798648);
    expect(ll.y2).toBe(78.13269569441843);
  });
});
