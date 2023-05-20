import * as fs from 'fs';

import * as path from 'path';

import { RNAComplexWrapper } from './RNAComplexWrapper';

let exampleRNAComplexFileNames = [
  'rnaComplex1.json',
  'rnaComplex2.json',
];

let exampleRNAComplexes = {};

exampleRNAComplexFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-rna-complexes', fileName);
  let fileExtension = path.extname(fileName);
  let rnaComplexName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleRNAComplexes[rnaComplexName] = JSON.parse(json);
});

describe('RNAComplexWrapper class', () => {
  it('stores wrapped RNA complex in wrappee property', () => {
    let wrappee = exampleRNAComplexes.rnaComplex1;
    expect(wrappee).toBeTruthy();
    let wrapper = new RNAComplexWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });
});
