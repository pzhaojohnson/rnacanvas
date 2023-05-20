import * as fs from 'fs';

import * as path from 'path';

import { LabelContentWrapper } from './LabelContentWrapper';

let exampleLabelContentFileNames = [
  'labelContent1.json',
  'labelContent2.json',
];

let exampleLabelContents = {};

exampleLabelContentFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-label-contents', fileName);
  let fileExtension = path.extname(fileName);
  let labelContentName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleLabelContents[labelContentName] = JSON.parse(json);
});

describe('LabelContentWrapper class', () => {
  it('stores wrapped label content in wrappee property', () => {
    let wrappee = exampleLabelContents.labelContent1;
    expect(wrappee).toBeTruthy();
    let wrapper = new LabelContentWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });

  test('classes getter', () => {
    let lc = new LabelContentWrapper(exampleLabelContents.labelContent2);

    expect(lc.classes).toStrictEqual(
      ['font', 'numbering-label', 'sequential']
    );
  });
});
