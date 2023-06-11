import * as fs from 'fs';

import * as path from 'path';

import { BasePairWrapper } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

import { LabelWrapper } from 'Foreign/RNA2D/wrappers/labels/LabelWrapper';

import { ResidueWrapper } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

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

  test('labels getter', () => {
    let rm = new RNAMoleculeWrapper(exampleRNAMolecules.rnaMolecule3);
    let labels = rm.labels;
    expect(labels.length).toBe(5);

    labels.forEach(l => {
      expect(l).toBeInstanceOf(LabelWrapper);
    });

    // just check some values of some labels
    expect(labels[1].residueIndex).toBe(20);
    expect(labels[3].labelContent.label).toBe('50');
    expect(labels[4].residueIndex).toBe(100);
  });

  test('name getter', () => {
    let rm = new RNAMoleculeWrapper(exampleRNAMolecules.rnaMolecule2);
    expect(rm.name).toBe('RNVU1-1');
  });

  test('sequence getter', () => {
    let rm = new RNAMoleculeWrapper(exampleRNAMolecules.rnaMolecule3);
    let sequence = rm.sequence;
    expect(sequence.length).toBe(123);

    sequence.forEach(r => {
      expect(r instanceof ResidueWrapper).toBeTruthy();
    });

    // just check some values of some residues
    expect(sequence[41].residueName).toBe('G');
    expect(sequence[62].x).toBe(88.03281772659034);
    expect(sequence[101].y).toBe(218.09275515362032);
  });
});
