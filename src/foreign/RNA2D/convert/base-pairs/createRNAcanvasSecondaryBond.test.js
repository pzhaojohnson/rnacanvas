import * as fs from 'fs';

import * as path from 'path';

// makes it possible to set SVG element coordinates
import * as SVG from 'Draw/svg/NodeSVG';

import { BasePairWrapper as RNA2DBasePairWrapper } from 'Foreign/RNA2D/wrappers/base-pairs/BasePairWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

import { ResidueWrapper as RNA2DResidueWrapper } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

import { createRNAcanvasSequence } from 'Foreign/RNA2D/convert/sequences/createRNAcanvasSequence';

import { createRNAcanvasSecondaryBond } from './createRNAcanvasSecondaryBond';

let rna2DBasePairsDirName = 'example-RNA2D-base-pairs';

let rna2DBasePairFileNames = [
  'basePair1.json',
  'basePair2.json',
  'basePair3.json',
  'basePair4.json',
  'largerResidueIndex1.json',
  'largerResidueIndex2.json',
  'redLine.json',
  'greenLine.json',
];

let rna2DBasePairs = {};

rna2DBasePairFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, rna2DBasePairsDirName, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DBasePair = new RNA2DBasePairWrapper(JSON.parse(json));
  let rna2DBasePairName = path.parse(fileName).name;
  rna2DBasePairs[rna2DBasePairName] = rna2DBasePair;
});

let rna2DClassesDirName = 'example-RNA2D-classes';

let rna2DClassFileNames = [
  'bpLine.json',
  'missingName.json',
  'redLine.json',
  'greenLine.json',
  'blueLine.json',
];

let rna2DClasses = {};

rna2DClassFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, rna2DClassesDirName, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DClass = new RNA2DClassWrapper(JSON.parse(json));
  let rna2DClassName = path.parse(fileName).name;
  rna2DClasses[rna2DClassName] = rna2DClass;
});

let rna2DSequencesDirName = 'example-RNA2D-sequences';

let rna2DSequenceFileNames = [
  'longSequence.json',
  'shortSequence.json',
];

let rnaCanvasSequences = {};

rna2DSequenceFileNames.forEach(fileName => {
  let filePath = path.resolve(__dirname, rna2DSequencesDirName, fileName);
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DSequence = JSON.parse(json).map(r => new RNA2DResidueWrapper(r));
  let rnaCanvasSequence = createRNAcanvasSequence({ rna2DSequence });
  let rnaCanvasSequenceName = path.parse(fileName).name;
  rnaCanvasSequences[rnaCanvasSequenceName] = rnaCanvasSequence;
});

describe('createRNAcanvasSecondaryBond function', () => {
  it('creates secondary bond with the correct bases', () => {
    let rnaCanvasSequence = rnaCanvasSequences.longSequence;
    expect(rnaCanvasSequence.length).toBe(159);

    let rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.largerResidueIndex2,
      rnaCanvasSequence,
    });

    expect(rnaCanvasSecondaryBond.base1).toBe(rnaCanvasSequence.bases[16]);
    expect(rnaCanvasSecondaryBond.base2).toBe(rnaCanvasSequence.bases[42]);

    rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.largerResidueIndex1,
      rnaCanvasSequence,
    });

    expect(rnaCanvasSecondaryBond.base1).toBe(rnaCanvasSequence.bases[18]);
    expect(rnaCanvasSecondaryBond.base2).toBe(rnaCanvasSequence.bases[6]);
  });

  it('throws for out of range residue indices', () => {
    let rnaCanvasSequence = rnaCanvasSequences.shortSequence;
    expect(rnaCanvasSequence.length).toBe(8);

    let rna2DBasePair = rna2DBasePairs.basePair3;
    expect(rna2DBasePair.residueIndex1).toBe(4);
    expect(rna2DBasePair.residueIndex2).toBe(42);

    expect(() => createRNAcanvasSecondaryBond({
      rna2DBasePair, rnaCanvasSequence,
    })).toThrow();

    rna2DBasePair = rna2DBasePairs.basePair4;
    expect(rna2DBasePair.residueIndex1).toBe(16);
    expect(rna2DBasePair.residueIndex2).toBe(2);

    expect(() => createRNAcanvasSecondaryBond({
      rna2DBasePair, rnaCanvasSequence,
    })).toThrow();
  });

  it('positions secondary bond', () => {
    let rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.basePair3,
      rnaCanvasSequence: rnaCanvasSequences.longSequence,
    });

    let line = rnaCanvasSecondaryBond.line;
    expect(line.attr('x1')).toBeCloseTo(72.38044260844322);
    expect(line.attr('y1')).toBeCloseTo(269.7809503645354);
    expect(line.attr('x2')).toBeCloseTo(58.21493504557432);
    expect(line.attr('y2')).toBeCloseTo(197.79233068313917);
  });

  it('initializes secondary bond values to their defaults', () => {
    let rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.basePair4,
      rnaCanvasSequence: rnaCanvasSequences.longSequence,
    });

    let line = rnaCanvasSecondaryBond.line;
    expect(line.attr('stroke')).toBe('#000000');
    expect(line.attr('stroke-width')).toBe(2);
    expect(line.attr('stroke-opacity')).toBe(1);
    expect(line.attr('stroke-linecap')).toBe('butt');
    expect(line.attr('stroke-dasharray')).toBe('none');

    expect(rnaCanvasSecondaryBond.basePadding1).toBeCloseTo(5.5);
    expect(rnaCanvasSecondaryBond.basePadding2).toBeCloseTo(5.5);
  });

  it('applies style properties of provided RNA 2D classes', () => {
    let rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.greenLine,
      rna2DClasses: [rna2DClasses.greenLine],
      rnaCanvasSequence: rnaCanvasSequences.longSequence,
    });

    let line = rnaCanvasSecondaryBond.line;

    // overwrote the default values
    expect(line.attr('stroke')).toBe('#0fd919');
    expect(line.attr('stroke-width')).toBe(1.7803);
  });

  it('ignores extra RNA 2D classes that the base-pair does not have', () => {
    let rnaCanvasSecondaryBond = createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.redLine,
      rna2DClasses: [
        rna2DClasses.blueLine, rna2DClasses.redLine, rna2DClasses.greenLine,
      ],
      rnaCanvasSequence: rnaCanvasSequences.longSequence,
    });

    let line = rnaCanvasSecondaryBond.line;
    expect(line.attr('stroke')).toBe('#c20e1d');
    expect(line.attr('stroke-width')).toBe(0.1911);
  });

  it('does not throw for invalid RNA 2D classes', () => {
    let invalidRNA2DClass = rna2DClasses.missingName;
    expect(() => invalidRNA2DClass.name).toThrow();

    expect(() => createRNAcanvasSecondaryBond({
      rna2DBasePair: rna2DBasePairs.basePair3,
      rna2DClasses: [invalidRNA2DClass],
      rnaCanvasSequence: rnaCanvasSequences.longSequence,
    })).not.toThrow();
  });
});
