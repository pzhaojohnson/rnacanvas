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

  test('applyTo method', () => {
    let sc1 = new SchemaClassWrapper(exampleSchemaClasses.schemaClass1);
    let line = svg.line(10, 20, 101, 15);
    sc1.applyTo(line);
    let stroke = new SVGColor(line.attr('stroke'));
    expect(stroke.toHex()).toBe('#cccccc');
    expect(line.attr('stroke-width')).toBe(0.1906);

    let sc2 = new SchemaClassWrapper(exampleSchemaClasses.schemaClass2);
    let text = svg.text('U');
    sc2.applyTo(text);
    expect(text.attr('font-family')).toBe('Helvetica');
    expect(text.attr('font-size')).toBe('3.048045px');
    expect(text.attr('font-weight')).toBe('bold');

    // did not apply the names of the schema classes
    expect(line.attr('name')).toBeUndefined();
    expect(text.attr('name')).toBeUndefined();
  });
});
