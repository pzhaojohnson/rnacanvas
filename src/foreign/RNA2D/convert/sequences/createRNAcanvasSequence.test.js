import * as fs from 'fs';

import * as path from 'path';

import { ResidueWrapper as RNA2DResidueWrapper } from 'Foreign/RNA2D/wrappers/residues/ResidueWrapper';

import { SchemaClassWrapper as RNA2DClassWrapper } from 'Foreign/RNA2D/wrappers/schema-classes/SchemaClassWrapper';

// necessary to set SVG text coordinates
import * as SVG from 'Draw/svg/NodeSVG';

import { createRNAcanvasSequence } from './createRNAcanvasSequence';

let rna2DSequencesDirPath = 'src/foreign/RNA2D/convert/sequences/example-RNA2D-sequences/';

let rna2DSequenceFileNames = [
  'empty.json',
  'fiveResidues.json',
  'coloredResidues.json',
];

let rna2DSequences = {};

rna2DSequenceFileNames.forEach(fileName => {
  let filePath = rna2DSequencesDirPath + fileName;
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DResidues = JSON.parse(json);
  let rna2DSequence = rna2DResidues.map(r => new RNA2DResidueWrapper(r));
  let rna2DSequenceName = path.parse(fileName).name;
  rna2DSequences[rna2DSequenceName] = rna2DSequence;
});

let rna2DClassesDirPath = 'src/foreign/RNA2D/convert/sequences/example-RNA2D-classes/';

let rna2DClassFileNames = [
  'textGreen.json',
  'textPink.json',
];

let rna2DClasses = {};

rna2DClassFileNames.forEach(fileName => {
  let filePath = rna2DClassesDirPath + fileName;
  let json = fs.readFileSync(filePath, 'utf8');
  let rna2DClass = new RNA2DClassWrapper(JSON.parse(json));
  let rna2DClassName = path.parse(fileName).name;
  rna2DClasses[rna2DClassName] = rna2DClass;
});

describe('createRNAcanvasSequence function', () => {
  it('creates sequence with specified ID', () => {
    let rnaCanvasSequence = createRNAcanvasSequence({
      id: 'id-187526',
      rna2DSequence: rna2DSequences.fiveResidues,
    });

    expect(rnaCanvasSequence.id).toBe('id-187526');
  });

  it('creates sequence with empty ID when no ID is specified', () => {
    let rnaCanvasSequence = createRNAcanvasSequence({
      rna2DSequence: rna2DSequences.fiveResidues,
    });

    expect(rnaCanvasSequence.id).toBe('');
  });

  it('can create an empty sequence', () => {
    let rnaCanvasSequence = createRNAcanvasSequence({
      rna2DSequence: rna2DSequences.empty,
    });

    expect(rnaCanvasSequence.length).toBe(0);
  });

  it('creates and appends bases in the right order', () => {
    let rnaCanvasSequence = createRNAcanvasSequence({
      rna2DSequence: rna2DSequences.fiveResidues,
    });

    expect(rnaCanvasSequence.length).toBe(5);

    expect(
      rnaCanvasSequence.bases.map(b => b.text.text()).join('')
    ).toBe('CCABU');
  });

  it('passes RNA 2D classes when creating bases', () => {
    let rnaCanvasSequence = createRNAcanvasSequence({
      rna2DSequence: rna2DSequences.coloredResidues,
      rna2DClasses: [rna2DClasses.textGreen, rna2DClasses.textPink],
    });

    expect(rnaCanvasSequence.length).toBe(2);
    expect(rnaCanvasSequence.bases[0].text.attr('fill')).toBe('#86a8ed');
    expect(rnaCanvasSequence.bases[1].text.attr('fill')).toBe('#0db526');
  });
});
