import * as SVG from '@svgdotjs/svg.js';
import { ScrollInterface } from 'Draw/ScrollInterface';
import { resize } from 'Draw/dimensions';
import { Sequence } from 'Draw/sequences/Sequence';
import { appendSequence } from 'Draw/sequences/add/sequence';
import {
  SavableState as SavableSequenceState,
  savableState as savableSequenceState,
} from 'Draw/sequences/save';
import { appendSavedSequence } from 'Draw/sequences/saved';
import { Base } from 'Draw/bases/Base';
import { orientBaseNumberings } from 'Draw/bases/numberings/orient';
import { PrimaryBond } from 'Draw/bonds/straight/PrimaryBond';
import { SecondaryBond } from 'Draw/bonds/straight/SecondaryBond';
import {
  SavableState as SavableStraightBondState,
  savableState as savableStraightBondState,
} from 'Draw/bonds/straight/save';
import { addSavedPrimaryBonds, addSavedSecondaryBonds } from 'Draw/bonds/straight/saved';
import { TertiaryBond } from 'Draw/bonds/curved/TertiaryBond';
import {
  SavableState as SavableTertiaryBondState,
  savableState as savableTertiaryBondState,
} from 'Draw/bonds/curved/save';
import { addSavedTertiaryBonds } from 'Draw/bonds/curved/saved';

import { SavedOriginExtractor } from './saved/SavedOriginExtractor';

let savedOriginExtractor = new SavedOriginExtractor();

export type Options = {
  // for specifying alternatives to components of the SVG.js library
  SVG?: {
    // if specified, is used to generate the SVG document of the drawing
    // (useful when testing on Node.js, which requires SVG documents be specially compatible)
    SVG?: () => SVG.Svg;
  }
}

/**
 * The saved form of a drawing.
 */
export type DrawingSavableState = (
  ReturnType<InstanceType<typeof Drawing>['savableState']>
);

export class Drawing {
  svgContainer!: HTMLElement;
  svg: SVG.Svg;

  readonly scroll: ScrollInterface;

  sequences: Sequence[];
  primaryBonds: PrimaryBond[];
  secondaryBonds: SecondaryBond[];
  tertiaryBonds: TertiaryBond[];

  /**
   * A way to indicate what the drawing was initially produced from
   * (e.g., an RNA 2D schema).
   *
   * Is allowed to be any string but is expected to be one of the
   * predefined strings listed below (or undefined).
   */
  origin?: (
    'rna-2d-schema'
    | string
    | undefined
  );

  constructor(options?: Options) {
    this.svgContainer = document.createElement('div');
    this.svgContainer.style.cssText = 'width: 100%; height: 100%; overflow: auto;';

    this.svg = options?.SVG?.SVG ? options.SVG.SVG() : SVG.SVG();
    this.svg.addTo(this.svgContainer);

    // initialize viewbox, width and height
    let width = 2 * window.screen.width;
    let height = 2 * window.screen.height;
    this.svg.viewbox(0, 0, width, height);
    this.svg.attr({ 'width': width, 'height': height });

    this.scroll = new ScrollInterface(this.svgContainer);

    this.sequences = [];
    this.primaryBonds = [];
    this.secondaryBonds = [];
    this.tertiaryBonds = [];
  }

  get node() {
    return this.svgContainer;
  }

  appendTo(container: Node) {
    container.appendChild(this.node);
  }

  get width(): number {
    return this.svg.viewbox().width;
  }

  get height(): number {
    return this.svg.viewbox().height;
  }

  isEmpty(): boolean {
    return this.numSequences == 0;
  }

  get numSequences(): number {
    return this.sequences.length;
  }

  getSequenceById(id: string): (Sequence | undefined) {
    return this.sequences.find(seq => seq.id === id);
  }

  forEachSequence(f: (seq: Sequence) => void) {
    this.sequences.forEach(seq => f(seq));
  }

  sequenceIds(): string[] {
    let ids = [] as string[];
    this.sequences.forEach(seq => ids.push(seq.id));
    return ids;
  }

  sequenceIdIsTaken(id: string): boolean {
    return this.sequenceIds().includes(id);
  }

  get overallCharacters(): string {
    let cs = '';
    this.forEachSequence(seq => {
      cs += seq.characters;
    });
    return cs;
  }

  /**
   * Returns null if the given sequence ID is taken.
   */
  appendSequence(id: string, characters: string): (Sequence | null) {
    if (this.sequenceIdIsTaken(id)) {
      return null;
    }
    return appendSequence(this, { id: id, characters: characters });
  }

  get numBases(): number {
    let n = 0;
    this.forEachSequence(seq => {
      n += seq.length;
    });
    return n;
  }

  getBaseById(id: string): (Base | null) {
    let base = null;
    this.forEachBase((b: Base) => {
      if (b.id === id) {
        base = b;
      }
    });
    return base;
  }

  getBaseAtOverallPosition(p: number): (Base | undefined) {
    let seqStart = 1;
    for (let s = 0; s < this.numSequences; s++) {
      let seq = this.sequences[s];
      let seqEnd = seqStart + seq.length - 1;
      if (p >= seqStart && p <= seqEnd) {
        return seq.getBaseAtPosition(p - seqStart + 1);
      }
      seqStart = seqEnd + 1;
    }
    return undefined;
  }

  /**
   * Returns zero if the given base is not in this drawing.
   */
  overallPositionOfBase(b: Base): number {
    let p = 0;
    this.forEachBase((base: Base, q: number) => {
      if (base.id === b.id) {
        p = q;
      }
    });
    return p;
  }

  forEachBase(f: (b: Base, p: number) => void) {
    let p = 1;
    this.forEachSequence(seq => {
      seq.bases.forEach(b => {
        f(b, p);
        p++;
      });
    });
  }

  bases(): Base[] {
    let bs: Base[] = [];
    this.forEachBase(b => bs.push(b));
    return bs;
  }

  createBases(characters: string): Base[] {
    let bs = [] as Base[];
    let x = 0;
    characters.split('').forEach(c => {
      bs.push(Base.create(this.svg, c, x, 0));
      x += 10;
    });
    return bs;
  }

  repositionBonds() {
    this.primaryBonds.forEach(pb => pb.reposition());
    this.secondaryBonds.forEach(sb => sb.reposition());
    this.tertiaryBonds.forEach(tb => tb.reposition());
  }

  clear() {
    this.sequences = [];
    this.primaryBonds = [];
    this.secondaryBonds = [];
    this.tertiaryBonds = [];
    this.svg.clear();
  }

  get svgString(): string {
    return this.svg.svg();
  }

  savableState() {
    let sequences = [] as SavableSequenceState[];
    this.forEachSequence(seq => sequences.push(savableSequenceState(seq)));
    let primaryBonds = [] as SavableStraightBondState[];
    this.primaryBonds.forEach(pb => primaryBonds.push(savableStraightBondState(pb)));
    let secondaryBonds = [] as SavableStraightBondState[];
    this.secondaryBonds.forEach(sb => secondaryBonds.push(savableStraightBondState(sb)));
    let tertiaryBonds = [] as SavableTertiaryBondState[];
    this.tertiaryBonds.forEach(tb => tertiaryBonds.push(savableTertiaryBondState(tb)));
    return {
      className: 'Drawing',
      origin: this.origin,
      svg: this.svg.svg(),
      sequences: sequences,
      primaryBonds: primaryBonds,
      secondaryBonds: secondaryBonds,
      tertiaryBonds: tertiaryBonds,
    };
  }

  /**
   * If the saved state cannot be successfully applied, the state
   * of the drawing will not be changed.
   *
   * Returns true if the saved state was successfully applied.
   */
  applySavedState(savedState: DrawingSavableState): boolean {
    let prevState = this.savableState();
    try {
      this._applySavedState(savedState);
      return true;
    } catch (err) {
      console.error(err);
      console.error('Unable to apply saved state.');
    }
    console.log('Reapplying previous state...');
    this._applySavedState(prevState);
    console.log('Reapplied previous state.');
    return false;
  }

  _applySavedState(savedState: DrawingSavableState): (void | never) {
    if (savedState.className !== 'Drawing') {
      throw new Error('Wrong class name.');
    }
    this.clear();
    this.origin = savedOriginExtractor.extract(savedState);
    this._applySavedSvg(savedState);
    this._appendSavedSequences(savedState);
    this._addSavedPrimaryBonds(savedState);
    this._addSavedSecondaryBonds(savedState);
    this._addSavedTertiaryBonds(savedState);
    orientBaseNumberings(this);
  }

  _applySavedSvg(savedState: DrawingSavableState): (void | never) {
    this.svg.clear();
    this.svg.svg(savedState.svg);
    let nested = this.svg.first() as SVG.Svg;
    let vb = nested.viewbox();
    let w = vb.width;
    let h = vb.height;
    let content = nested.svg(false);
    this.svg.clear();
    this.svg.svg(content);
    resize(this, { width: w, height: h });
  }

  _appendSavedSequences(savedState: DrawingSavableState): (void | never) {
    savedState.sequences.forEach(saved => {
      appendSavedSequence(this, saved);
    });
  }

  _addSavedPrimaryBonds(savedState: DrawingSavableState): (void | never) {
    addSavedPrimaryBonds(this, savedState.primaryBonds);
  }

  _addSavedSecondaryBonds(savedState: DrawingSavableState): (void | never) {
    addSavedSecondaryBonds(this, savedState.secondaryBonds);
  }

  _addSavedTertiaryBonds(savedState: DrawingSavableState): (void | never) {
    addSavedTertiaryBonds(this, savedState.tertiaryBonds);
  }
}

export default Drawing;
