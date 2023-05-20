import * as fs from 'fs';

import * as path from 'path';

import { SchemaClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

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
    let schema = new SchemaWrapper(exampleSchemas.schema1);
    expect(schema.classes.length).toBe(3);

    schema.classes.forEach(c => {
      expect(c instanceof SchemaClassWrapper).toBeTruthy();
    });

    expect(schema.classes[0].name).toBe('font');
    expect(schema.classes[1].name).toBe('numbering-line');
    expect(schema.classes[2].name).toBe('bp-line');
  });
});
