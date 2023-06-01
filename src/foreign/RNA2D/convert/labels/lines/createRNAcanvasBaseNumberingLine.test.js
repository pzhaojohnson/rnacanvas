import * as fs from 'fs';

import * as path from 'path';

import { LabelLineWrapper as RNA2DLabelLineWrapper } from 'Foreign/RNA2D/wrappers/labels/lines/LabelLineWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { createRNAcanvasBaseNumberingLine } from './createRNAcanvasBaseNumberingLine';

let rna2DLabelLineFileNames = [
  'labelLine1.json',
  'labelLine2.json',
  'labelLine3.json',
  'purpleLine.json',
];

let rna2DLabelLines = {};

rna2DLabelLineFileNames.forEach(fileName => {
  let dirPath = path.resolve(__dirname, 'example-RNA2D-label-lines');
  let filePath = path.resolve(dirPath, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DLabelLine = new RNA2DLabelLineWrapper(JSON.parse(json));
  let rna2DLabelLineName = path.parse(fileName).name;
  rna2DLabelLines[rna2DLabelLineName] = rna2DLabelLine;
});

let rna2DClassFileNames = [
  'numberingLine.json',
  'redLine.json',
  'greenLine.json',
  'purpleLine.json',
  'thickLine.json',
  'missingName.json',
];

let rna2DClasses = {};

rna2DClassFileNames.forEach(fileName => {
  let dirPath = path.resolve(__dirname, 'example-RNA2D-classes');
  let filePath = path.resolve(dirPath, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DClass = new RNA2DClassWrapper(JSON.parse(json));
  let rna2DClassName = path.parse(fileName).name;
  rna2DClasses[rna2DClassName] = rna2DClass;
});

describe('createRNAcanvasBaseNumberingLine function', () => {
  it('positions the line', () => {
    let line = createRNAcanvasBaseNumberingLine({
      rna2DLabelLine: rna2DLabelLines.labelLine1,
    });

    expect(line.attr('x1')).toBe(73.81976021078886);
    expect(line.attr('y1')).toBe(176.06973206402523);
    expect(line.attr('x2')).toBe(70.6689039368516);
    expect(line.attr('y2')).toBe(175.58693957043806);
  });

  it('applies default values', () => {
    let line = createRNAcanvasBaseNumberingLine({
      rna2DLabelLine: rna2DLabelLines.labelLine1,
    });

    expect(line.attr('stroke')).toBe('#525252');
    expect(line.attr('stroke-width')).toBe(1);
    expect(line.attr('stroke-opacity')).toBe(1);
    expect(line.attr('stroke-dasharray')).toBe('none');
  });

  it('applies RNA 2D classes when provided', () => {
    let line = createRNAcanvasBaseNumberingLine({
      rna2DLabelLine: rna2DLabelLines.labelLine3,
      rna2DClasses: [rna2DClasses.thickLine, rna2DClasses.greenLine],
    });

    // overwrote default values
    expect(line.attr('stroke')).toBe('#0de00d');
    expect(line.attr('stroke-width')).toBe(25.9);
  });

  it('ignores extra RNA 2D classes', () => {
    let line = createRNAcanvasBaseNumberingLine({
      rna2DLabelLine: rna2DLabelLines.purpleLine,
      rna2DClasses: [
        rna2DClasses.redLine, rna2DClasses.purpleLine, rna2DClasses.greenLine,
      ],
    });

    expect(line.attr('stroke')).toBe('#9e0de0');
  });

  it('does not throw for invalid RNA 2D classes', () => {
    let invalidRNA2DClass = rna2DClasses.missingName;
    expect(() => invalidRNA2DClass.name).toThrow();

    expect(() => createRNAcanvasBaseNumberingLine({
      rna2DLabelLine: rna2DLabelLines.labelLine1,
      rna2DClasses: [invalidRNA2DClass],
    })).not.toThrow();
  });
});
