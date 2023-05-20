import * as fs from 'fs';

import * as path from 'path';

import { RNAMoleculeWrapper } from 'Foreign/RNA2D/wrappers/rna-molecules/RNAMoleculeWrapper';

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

  test('name getter', () => {
    let rc = new RNAComplexWrapper(exampleRNAComplexes.rnaComplex2);
    expect(rc.name).toBe('Complex-187461');
  });

  test('rnaMolecules getter', () => {
    let rc = new RNAComplexWrapper(exampleRNAComplexes.rnaComplex2);
    let rnaMolecules = rc.rnaMolecules;
    expect(rnaMolecules.length).toBe(1);

    // just check some RNA molecule properties
    let rnaMolecule1 = rnaMolecules[0];
    expect(rnaMolecule1 instanceof RNAMoleculeWrapper).toBeTruthy();
    expect(rnaMolecule1.name).toBe('Molecule-129841');
    expect(rnaMolecule1.sequence.length).toBe(123);
    expect(rnaMolecule1.basePairs.length).toBe(70);
  });
});
