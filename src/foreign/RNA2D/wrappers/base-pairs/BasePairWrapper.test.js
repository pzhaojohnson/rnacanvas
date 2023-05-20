import * as fs from 'fs';

import * as path from 'path';

import { BasePairWrapper } from './BasePairWrapper';

let exampleBasePairFileNames = [
  'basePair1.json',
  'basePair2.json',
  'basePair3.json',
];

let exampleBasePairs = {};

exampleBasePairFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-base-pairs', fileName);
  let fileExtension = path.extname(fileName);
  let basePairName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleBasePairs[basePairName] = JSON.parse(json);
});

describe('BasePairWrapper class', () => {
  it('stores passed base-pair in wrappee property', () => {
    let bp = exampleBasePairs.basePair1;
    expect(bp).toBeTruthy();
    let wrapper = new BasePairWrapper(bp);
    expect(wrapper.wrappee).toBe(bp);
  });

  test('basePairType getter', () => {
    let bp = new BasePairWrapper(exampleBasePairs.basePair2);
    expect(bp.basePairType).toBe('canonical');
  });
});
