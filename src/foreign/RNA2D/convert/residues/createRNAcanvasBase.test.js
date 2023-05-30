import * as fs from 'fs';

import * as path from 'path';

import { ResidueWrapper as RNA2DResidueWrapper } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

// necessary to set SVG text coordinates
import * as SVG from 'Draw/svg/NodeSVG';

import { createRNAcanvasBase } from './createRNAcanvasBase';

let rna2DResiduesDirPath = 'src/foreign/RNA2D/convert/residues/example-RNA2D-residues/';

let rna2DResidueFileNames = [
  'residueNameOfC.json',
  'residueNameOfG.json',
  'multiCharacterResidueName.json',
  'missingResidueName.json',
  'missingXCoordinate.json',
  'missingYCoordinate.json',
];

let rna2DResidues = {};

rna2DResidueFileNames.forEach(fileName => {
  let filePath = rna2DResiduesDirPath + fileName;
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DResidue = new RNA2DResidueWrapper(JSON.parse(json));
  let rna2DResidueName = path.parse(fileName).name;
  rna2DResidues[rna2DResidueName] = rna2DResidue;
});

let rna2DClassesDirPath = 'src/foreign/RNA2D/convert/residues/example-RNA2D-classes/';

let rna2DClassFileNames = [
  'font.json',
  'font2.json',
  'textGreen.json',
  'textPink.json',
  'missingName.json',
];

let rna2DClasses = {};

rna2DClassFileNames.forEach(fileName => {
  let filePath = rna2DClassesDirPath + fileName;
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DClass = new RNA2DClassWrapper(JSON.parse(json));
  let rna2DClassName = path.parse(fileName).name;
  rna2DClasses[rna2DClassName] = rna2DClass;
});

describe('createRNAcanvasBase function', () => {
  it('includes residue name', () => {
    let rna2DResidue = rna2DResidues.residueNameOfC;
    let rnaCanvasBase = createRNAcanvasBase({ rna2DResidue });
    expect(rnaCanvasBase.text.text()).toBe('C');

    rna2DResidue = rna2DResidues.residueNameOfG;
    rnaCanvasBase = createRNAcanvasBase({ rna2DResidue });
    expect(rnaCanvasBase.text.text()).toBe('G');

    rna2DResidue = rna2DResidues.multiCharacterResidueName;
    rnaCanvasBase = createRNAcanvasBase({ rna2DResidue });
    expect(rnaCanvasBase.text.text()).toBe('CAG');
  });

  test('when residue name is missing', () => {
    let rna2DResidue = rna2DResidues.missingResidueName;

    // the current behavior
    expect(() => createRNAcanvasBase({ rna2DResidue }))
      .toThrow();
  });

  it('sets center coordinates', () => {
    let rna2DResidue = rna2DResidues.residueNameOfC;
    let rnaCanvasBase = createRNAcanvasBase({ rna2DResidue });
    expect(rnaCanvasBase.text.cx()).toBeCloseTo(73.44233794454794);
    expect(rnaCanvasBase.text.cy()).toBeCloseTo(282.7374657490367);
  });

  test('when center coordinates are missing', () => {
    let rna2DResidue = rna2DResidues.missingXCoordinate;

    // the current behavior
    expect(() => createRNAcanvasBase({ rna2DResidue }))
      .toThrow();

    rna2DResidue = rna2DResidues.missingYCoordinate;

    // the current behavior
    expect(() => createRNAcanvasBase({ rna2DResidue }))
      .toThrow();
  });

  it('styles the base when RNA 2D classes are provided', () => {
    let rnaCanvasBase = createRNAcanvasBase({
      rna2DResidue: rna2DResidues.residueNameOfG,
      rna2DClasses: [rna2DClasses.font, rna2DClasses.textGreen],
    });

    // font class attributes
    expect(rnaCanvasBase.text.attr('font-family')).toBe('Helvetica');
    expect(rnaCanvasBase.text.attr('font-size')).toBe('3.056220px');
    expect(rnaCanvasBase.text.attr('font-weight')).toBe('bold');

    // text-green class attributes
    expect(rnaCanvasBase.text.attr('fill')).toBe('#0db526');
  });

  it('sets center coordinates after styling the base', () => {
    let rnaCanvasBase = createRNAcanvasBase({
      rna2DResidue: rna2DResidues.residueNameOfG,
      rna2DClasses: [rna2DClasses.font2],
    });

    expect(rnaCanvasBase.text.cx()).toBeCloseTo(38.0630397094696);
    expect(rnaCanvasBase.text.cy()).toBeCloseTo(189.9558152986379);

    // set back to default
    rnaCanvasBase.text.attr('font-size', null);

    expect(rnaCanvasBase.text.cx()).not.toBeCloseTo(38.0630397094696);
    expect(rnaCanvasBase.text.cy()).not.toBeCloseTo(189.9558152986379);
  });

  it('ignores extra RNA 2D classes that the residue does not have', () => {
    let rna2DResidue = rna2DResidues.residueNameOfC;
    expect(rna2DResidue.classes.includes('text-pink')).toBeFalsy();

    let rnaCanvasBase = createRNAcanvasBase({
      rna2DResidue,
      rna2DClasses: [rna2DClasses.textPink],
    });

    expect(rnaCanvasBase.text.attr('fill')).toBe('#000000');
  });

  test('an RNA 2D class with a missing name', () => {
    let rna2DResidue = rna2DResidues.residueNameOfC;
    let rna2DClass = rna2DClasses.missingName;

    // the current behavior
    expect(() => rna2DClass.name).toThrow();

    // should ignore invalid RNA 2D classes
    expect(() => {
      createRNAcanvasBase({ rna2DResidue, rna2DClasses: [rna2DClass] });
    }).not.toThrow();
  });
});
