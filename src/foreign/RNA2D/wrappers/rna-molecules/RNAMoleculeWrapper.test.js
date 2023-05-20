import * as fs from 'fs';

import * as path from 'path';

import { BasePairWrapper } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

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

  test('basePairs getter', () => {
    let rm = new RNAMoleculeWrapper(exampleRNAMolecules.rnaMolecule2);
    let basePairs = rm.basePairs;
    expect(basePairs.length).toBe(66);

    basePairs.forEach(bp => {
      expect(bp instanceof BasePairWrapper).toBeTruthy();
    });

    // just check some values of some base-pairs
    expect(basePairs[4].residueIndex2).toBe(153);
    expect(basePairs[11].residueIndex1).toBe(17);
    expect(basePairs[18].residueIndex2).toBe(33);
  });

  test('name getter', () => {
    let rm = new RNAMoleculeWrapper(exampleRNAMolecules.rnaMolecule2);
    expect(rm.name).toBe('RNVU1-1');
  });
});
