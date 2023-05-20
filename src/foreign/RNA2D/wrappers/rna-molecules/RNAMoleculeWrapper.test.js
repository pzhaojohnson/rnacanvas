import * as fs from 'fs';

import * as path from 'path';

import { RNAMoleculeWrapper } from './RNAMoleculeWrapper';

let exampleRNAMoleculeFileNames = [
  'rnaMolecule1.json',
  'rnaMolecule2.json',
  'rnaMolecule3.json',
];

let exampleRNAMolecules = {};

exampleRNAMoleculeFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-rna-molecules', fileName);
  let fileExtension = path.extname(fileName);
  let rnaMoleculeName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleRNAMolecules[rnaMoleculeName] = JSON.parse(json);
});

describe('RNAMoleculeWrapper class', () => {
  it('stores wrapped RNA molecule in wrappee property', () => {
    let wrappee = exampleRNAMolecules.rnaMolecule1;
    expect(wrappee).toBeTruthy();
    let wrapper = new RNAMoleculeWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });
});
