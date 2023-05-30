import * as fs from 'fs';

import * as path from 'path';

import * as SVG from 'Draw/svg/NodeSVG';

import { Color as SVGColor } from '@svgdotjs/svg.js';

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

let svg = null;

beforeEach(() => {
  svg = SVG.SVG();
  svg.addTo(document.body);
});

afterEach(() => {
  svg.remove();
  svg = null;
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

  test('styleProperties getter', () => {
    let sc = new SchemaClassWrapper(exampleSchemaClasses.schemaClass2);
    let styleProperties = sc.styleProperties;

    // included all style properties
    expect(styleProperties['font-family']).toBe('Helvetica');
    expect(styleProperties['font-size']).toBe('3.048045px');
    expect(styleProperties['font-weight']).toBe('bold');

    // omitted name
    expect('name' in styleProperties).toBeFalsy();
  });
});
