import * as fs from 'fs';

import * as path from 'path';

// makes it possible to set certain SVG element coordinates
import * as SVG from 'Draw/svg/NodeSVG';

import { LabelWrapper as RNA2DLabelWrapper } from 'Foreign/RNA2D/wrappers/labels/LabelWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { createRNAcanvasBaseNumbering } from './createRNAcanvasBaseNumbering';

let rna2DLabelFileNames = [
  'label1.json',
  'label2.json',
  'label3.json',
];

let rna2DLabels = {};

rna2DLabelFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-RNA2D-labels', fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DLabel = new RNA2DLabelWrapper(JSON.parse(json));
  let rna2DLabelName = path.parse(fileName).name;
  rna2DLabels[rna2DLabelName] = rna2DLabel;
});

let rna2DClassFileNames = [
  'redLine.json',
  'thickLine.json',
  'font.json',
  'textBlue.json',
];

let rna2DClasses = {};

rna2DClassFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, 'example-RNA2D-classes', fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DClass = new RNA2DClassWrapper(JSON.parse(json));
  let rna2DClassName = path.parse(fileName).name;
  rna2DClasses[rna2DClassName] = rna2DClass;
});

describe('createRNAcanvasBaseNumbering function', () => {
  it('creates text element for base numbering', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label1,
    });

    // just check some text attributes
    expect(bn.text.text()).toBe('20');
    expect(bn.text.cx()).toBeCloseTo(18.540252738533944);
  });

  it('applies RNA 2D classes to base numbering text element', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label3,
      rna2DClasses: [rna2DClasses.font, rna2DClasses.textBlue],
    });

    expect(bn.text.attr('font-family')).toBe('Helvetica');
    expect(bn.text.attr('font-size')).toBe(3.056220);
    expect(bn.text.attr('font-weight')).toBe('bold');
    expect(bn.text.attr('fill')).toBe('#5aa8e0');
  });

  it('creates line element for base numbering', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label1,
    });

    // just check some line attributes
    expect(bn.line.attr('x1')).toBeCloseTo(22.21629648279994);
    expect(bn.line.attr('x2')).toBeCloseTo(20.16755068885685);
  });

  it('applies RNA 2D classes to base numbering line element', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label2,
      rna2DClasses: [rna2DClasses.thickLine, rna2DClasses.redLine],
    });

    expect(bn.line.attr('stroke')).toBe('#e03409');
    expect(bn.line.attr('stroke-width')).toBe(25.9);
  });

  it('passes base center coordinates', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label2,
      rna2DClasses: [rna2DClasses.thickLine, rna2DClasses.redLine],
      baseCenter: { x: 24.71629648279994, y: 186.66203322387253 },
    });

    // requires knowing the base center to calculate
    expect(bn.basePadding).toBeCloseTo(2.6705449688853684);
  });

  it('passes base center coordinates of (0, 0) by default', () => {
    let bn = createRNAcanvasBaseNumbering({
      rna2DLabel: rna2DLabels.label2,
      rna2DClasses: [rna2DClasses.thickLine, rna2DClasses.redLine],
    });

    // the result if the passed base center was (0, 0)
    expect(bn.basePadding).toBeCloseTo(188.91196193688614);
  });
});
