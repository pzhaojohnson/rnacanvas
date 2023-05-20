import * as fs from 'fs';

import * as path from 'path';

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
});
