import * as fs from 'fs';

import * as path from 'path';

import { SchemaClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { RNAComplexWrapper } from 'Foreign/RNA2D/wrappers/rna-complexes/RNAComplexWrapper';

import { SchemaWrapper } from './SchemaWrapper';

let exampleSchemaFileNames = [
  'schema1.json',
];

let exampleSchemas = {};

exampleSchemaFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-schemas', fileName);
  let fileExtension = path.extname(fileName);
  let schemaName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleSchemas[schemaName] = JSON.parse(json);
});

describe('SchemaWrapper class', () => {
  it('stores wrapped schema in wrappee property', () => {
    let wrappee = exampleSchemas.schema1;
    expect(wrappee).toBeTruthy();
    let wrapper = new SchemaWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });

  test('classes getter', () => {
    // has 3 classes explicitly
    let schema = new SchemaWrapper(exampleSchemas.schema1);

    // 3 + 4 hard-coded classes
    expect(schema.classes.length).toBe(7);

    schema.classes.forEach(c => {
      expect(c instanceof SchemaClassWrapper).toBeTruthy();
    });

    expect(schema.classes[0].name).toBe('text-black');
    expect(schema.classes[1].name).toBe('text-green');
    expect(schema.classes[2].name).toBe('text-red');
    expect(schema.classes[3].name).toBe('text-blue');
    expect(schema.classes[4].name).toBe('font');
    expect(schema.classes[5].name).toBe('numbering-line');
    expect(schema.classes[6].name).toBe('bp-line');
  });

  test('rnaComplexes getter', () => {
    let schema = new SchemaWrapper(exampleSchemas.schema1);
    let rnaComplexes = schema.rnaComplexes;
    expect(rnaComplexes.length).toBe(1);

    // just check some RNA complex properties
    let rnaComplex1 = rnaComplexes[0];
    expect(rnaComplex1 instanceof RNAComplexWrapper).toBeTruthy();
    expect(rnaComplex1.rnaMolecules.length).toBe(1);

    // just check some RNA molecule properties
    let rnaMolecule1 = rnaComplex1.rnaMolecules[0];
    expect(rnaMolecule1.sequence.length).toBe(159);
    expect(rnaMolecule1.basePairs.length).toBe(66);
  });
});
