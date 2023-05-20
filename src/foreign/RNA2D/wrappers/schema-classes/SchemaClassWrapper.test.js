import * as fs from 'fs';

import * as path from 'path';

import { SchemaClassWrapper } from './SchemaClassWrapper';

let exampleSchemaClassFileNames = [
  'schemaClass1.json',
  'schemaClass2.json',
  'schemaClass3.json',
];

let exampleSchemaClasses = {};

exampleSchemaClassFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-schema-classes', fileName);
  let fileExtension = path.extname(fileName);
  let schemaClassName = path.basename(filePath, fileExtension);
  let json = fs.readFileSync(filePath, 'utf8');
  exampleSchemaClasses[schemaClassName] = JSON.parse(json);
});

describe('SchemaClassWrapper class', () => {
  it('stores wrapped schema class in wrappee property', () => {
    let wrappee = exampleSchemaClasses.schemaClass1;
    expect(wrappee).toBeTruthy();
    let wrapper = new SchemaClassWrapper(wrappee);
    expect(wrapper.wrappee).toBe(wrappee);
  });

  test('name getter', () => {
    let sc = new SchemaClassWrapper(exampleSchemaClasses.schemaClass3);
    expect(sc.name).toBe('bp-line');
  });
});
