import * as fs from 'fs';

import * as path from 'path';

import { ResidueWrapper } from './ResidueWrapper';

let exampleResidueFileNames = [
  'residue1.json',
];

let exampleResidues = {};

exampleResidueFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-residues', fileName);
  let fileExtension = path.extname(fileName);
  let residueName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleResidues[residueName] = JSON.parse(json);
});

describe('ResidueWrapper class', () => {
  it('stores passed residue in wrappee property', () => {
    let wrappee = exampleResidues.residue1;
    expect(wrappee).toBeTruthy();
    let wrapper = new ResidueWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });
});
