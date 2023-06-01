import * as fs from 'fs';

import * as path from 'path';

// makes it possible to set SVG text center coordinates
import * as SVG from 'Draw/svg/NodeSVG';

import { LabelContentWrapper as RNA2DLabelContentWrapper } from 'Foreign/RNA2D/wrappers/labels/contents/LabelContentWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { createRNAcanvasBaseNumberingText } from './createRNAcanvasBaseNumberingText';

let rna2DLabelContentFileNames = [
  'labelContent1.json',
  'labelContent2.json',
  'booleanContent.json',
  'textBlue.json',
];

let rna2DLabelContents = {};

rna2DLabelContentFileNames.forEach(fileName => {
  let dirPath = path.resolve(__dirname, 'example-RNA2D-label-contents');
  let filePath = path.resolve(dirPath, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DLabelContent = new RNA2DLabelContentWrapper(JSON.parse(json));
  let rna2DLabelContentName = path.parse(fileName).name;
  rna2DLabelContents[rna2DLabelContentName] = rna2DLabelContent;
});

let rna2DClassFileNames = [
  'font.json',
  'textGreen.json',
  'textBlue.json',
  'textRed.json',
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

describe('createRNAcanvasBaseNumberingText function', () => {
  it('sets text content', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent1,
    });

    expect(text.text()).toBe('50');

    text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent2,
    });

    expect(text.text()).toBe('20');
  });

  it('converts non-string content to text content', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.booleanContent,
    });

    // the current behavior
    expect(text.text()).toBe('false');
  });

  it('applies default values', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent2,
    });

    expect(text.attr('font-family')).toBe('Arial');
    expect(text.attr('font-size')).toBe(9);
    expect(text.attr('font-weight')).toBe('normal');
    expect(text.attr('fill')).toBe('#525252');
    expect(text.attr('fill-opacity')).toBe(1);
  });

  it('applies RNA 2D classes when provided', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent2,
      rna2DClasses: [rna2DClasses.font, rna2DClasses.textRed],
    });

    // overwrote default values
    expect(text.attr('font-family')).toBe('Helvetica');
    expect(text.attr('font-size')).toBe(3.056220);
    expect(text.attr('font-weight')).toBe('bold');
    expect(text.attr('fill')).toBe('#cc0a34');
  });

  it('ignores extra RNA 2D classes', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.textBlue,
      rna2DClasses: [
        rna2DClasses.textGreen, rna2DClasses.textBlue, rna2DClasses.textRed,
      ],
    });

    expect(text.attr('fill')).toBe('#5aa8e0');
  });

  it('does not throw for invalid RNA 2D classes', () => {
    let invalidRNA2DClass = rna2DClasses.missingName;
    expect(() => invalidRNA2DClass.name).toThrow();

    expect(() => createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent1,
      rna2DClasses: [invalidRNA2DClass],
    })).not.toThrow();
  });

  it('positions text after styling', () => {
    let text = createRNAcanvasBaseNumberingText({
      rna2DLabelContent: rna2DLabelContents.labelContent1,
      rna2DClasses: [rna2DClasses.font],
    });

    expect(text.cx()).toBeCloseTo(68.83517161797342);
    expect(text.cy()).toBeCloseTo(175.30596445706158);

    // remove some styling
    text.attr('font-family', null);
    text.attr('font-size', null);

    // must have been positioned after styling
    expect(text.cx()).not.toBeCloseTo(68.83517161797342);
    expect(text.cy()).not.toBeCloseTo(175.30596445706158);
  });
});
