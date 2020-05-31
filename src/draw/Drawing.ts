import {
  DrawingInterface,
  ForEachBaseFunc,
  DrawingSavableState,
} from './DrawingInterface';
import { SvgInterface as Svg } from './SvgInterface';
import Sequence from './Sequence';
import { SequenceSavableState } from './SequenceInterface';
import Base from './Base';
import {
  PrimaryBond,
  SecondaryBond,
} from './StraightBond';
import { TertiaryBond } from './QuadraticBezierBond';
import { adjustBaseNumbering } from './edit/adjustBaseNumbering';

class Drawing implements DrawingInterface {
  _div: HTMLElement;
  _svg: Svg;

  _sequences: Sequence[];
  _primaryBonds: PrimaryBond[];
  _secondaryBonds: SecondaryBond[];
  _tertiaryBonds: TertiaryBond[];

  _onAddSequence: (seq: Sequence) => void;
  _onAddTertiaryBond: (tb: TertiaryBond) => void;

  constructor() {
    this._sequences = [];
    this._primaryBonds = [];
    this._secondaryBonds = [];
    this._tertiaryBonds = [];
  }

  addTo(container: Node, SVG: () => Svg) {
    this._div = document.createElement('div');
    this._div.style.cssText = 'width: 100%; height: 100%; overflow: auto;';
    container.appendChild(this._div);
    this._svg = SVG().addTo(this._div);
    this._svg.attr({
      'width': 2 * window.screen.width,
      'height': 2 * window.screen.height,
    });
  }

  centerView() {
    this._div.scrollLeft = (this._div.scrollWidth - window.innerWidth) / 2;
    this._div.scrollTop = (this._div.scrollHeight - this._div.clientHeight) / 2;
  }

  get width(): number {
    return this._svg.viewbox().width;
  }

  get height(): number {
    return this._svg.viewbox().height;
  }

  setWidthAndHeight(width: number, height: number) {
    let z = this.zoom;
    this._svg.viewbox(0, 0, width, height);
    this._svg.attr({
      'width': z * width,
      'height': z * height,
    });
  }

  get zoom(): number {
    let vb = this._svg.viewbox();
    if (vb.width == 0) {
      return 1;
    }
    return this._svg.attr('width') / vb.width;
  }

  set zoom(z: number) {
    let vb = this._svg.viewbox();
    let w = z * vb.width;
    let h = z * vb.height;
    let change = z / this.zoom;
    let sl = Math.floor(change * this._div.scrollLeft);
    let st = Math.floor(change * this._div.scrollTop);
    this._svg.attr({ 'width': w, 'height': h });
    this._div.scrollLeft = sl;
    this._div.scrollTop = st;
  }

  get numSequences(): number {
    return this._sequences.length;
  }

  isEmpty(): boolean {
    return this.numSequences == 0;
  }

  getSequenceById(id: string): (Sequence | undefined) {
    return this._sequences.find(seq => seq.id === id);
  }

  getSequenceAtIndex(i: number): (Sequence | undefined) {
    return this._sequences[i];
  }

  forEachSequence(f: (seq: Sequence) => void) {
    this._sequences.forEach(seq => f(seq));
  }

  sequenceIds(): string[] {
    let ids = [] as string[];
    this._sequences.forEach(seq => ids.push(seq.id));
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
  appendSequenceOutOfView(id: string, characters: string): (Sequence | null) {
    if (this.sequenceIdIsTaken(id)) {
      return null;
    }
    let seq = Sequence.createOutOfView(this._svg, id, characters);
    this._sequences.push(seq);
    this.fireAddSequence(seq);
    return seq;
  }

  onAddSequence(f: (seq: Sequence) => void) {
    this._onAddSequence = f;
  }

  fireAddSequence(seq: Sequence) {
    if (this._onAddSequence) {
      this._onAddSequence(seq);
    }
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

  getBaseAtOverallPosition(p: number): (Base | null) {
    let seqStart = 1;
    for (let s = 0; s < this.numSequences; s++) {
      let seq = this._sequences[s];
      let seqEnd = seqStart + seq.length - 1;
      if (p >= seqStart && p <= seqEnd) {
        return seq.getBaseAtPosition(p - seqStart + 1);
      }
      seqStart = seqEnd + 1;
    }
    return null;
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

  forEachBase(f: ForEachBaseFunc) {
    let p = 1;
    this.forEachSequence(seq => {
      seq.forEachBase((b: Base) => {
        f(b, p);
        p++;
      });
    });
  }

  baseIds(): string[] {
    let ids = [] as string[];
    this.forEachBase((b: Base) => ids.push(b.id));
    return ids;
  }

  sequenceOfBase(b: Base): (Sequence | undefined) {
    return this._sequences.find(seq => seq.contains(b));
  }

  get numPrimaryBonds(): number {
    return this._primaryBonds.length;
  }

  forEachPrimaryBond(f: (pb: PrimaryBond) => void) {
    this._primaryBonds.forEach(pb => f(pb));
  }

  addPrimaryBond(b1: Base, b2: Base): PrimaryBond {
    let sb = PrimaryBond.create(this._svg, b1, b2);
    this._primaryBonds.push(sb);
    return sb;
  }

  get numSecondaryBonds(): number {
    return this._secondaryBonds.length;
  }

  getSecondaryBondById(id: string): (SecondaryBond | undefined) {
    return this._secondaryBonds.find(sb => sb.id === id);
  }
  
  forEachSecondaryBond(f: (sb: SecondaryBond) => void) {
    this._secondaryBonds.forEach(sb => f(sb));
  }

  addSecondaryBond(b1: Base, b2: Base): SecondaryBond {
    let sb = SecondaryBond.create(this._svg, b1, b2);
    this._secondaryBonds.push(sb);
    return sb;
  }

  removeSecondaryBondById(id: string) {
    let sb = this.getSecondaryBondById(id);
    if (sb) {
      sb.remove();
      this._secondaryBonds = this._secondaryBonds.filter(sb => sb.id !== id);
    }
  }

  get numTertiaryBonds(): number {
    return this._tertiaryBonds.length;
  }

  getTertiaryBondById(id: string): (TertiaryBond | undefined) {
    return this._tertiaryBonds.find(tb => tb.id === id);
  }

  forEachTertiaryBond(f: (tb: TertiaryBond) => void) {
    this._tertiaryBonds.forEach(tb => f(tb));
  }

  addTertiaryBond(b1: Base, b2: Base): TertiaryBond {
    let tb = TertiaryBond.create(this._svg, b1, b2);
    this._tertiaryBonds.push(tb);
    this.fireAddTertiaryBond(tb);
    return tb;
  }

  onAddTertiaryBond(f: (tb: TertiaryBond) => void) {
    this._onAddTertiaryBond = f;
  }

  fireAddTertiaryBond(tb: TertiaryBond) {
    if (this._onAddTertiaryBond) {
      this._onAddTertiaryBond(tb);
    }
  }

  removeTertiaryBondById(id: string) {
    let tb = this.getTertiaryBondById(id);
    if (tb) {
      tb.remove();
      this._tertiaryBonds = this._tertiaryBonds.filter(tb => tb.id !== id);
    }
  }

  repositionBonds() {
    this.forEachPrimaryBond(pb => pb.reposition());
    this.forEachSecondaryBond(sb => sb.reposition());
    this.forEachTertiaryBond(tb => tb.reposition());
  }

  adjustNumberingLineAngles() {
    adjustBaseNumbering(this);
  }

  adjustBaseNumbering() {
    adjustBaseNumbering(this);
  }

  onMousedown(f: () => void) {
    this._svg.mousedown(f);
  }

  clear() {
    this._sequences = [];
    this._primaryBonds = [];
    this._secondaryBonds = [];
    this._tertiaryBonds = [];
    this._svg.clear();
  }

  get svgString(): string {
    return this._svg.svg();
  }

  savableState(): DrawingSavableState {
    let sequences = [] as SequenceSavableState[];
    this.forEachSequence(seq => sequences.push(seq.savableState()));
    let primaryBonds = [] as object[];
    this.forEachPrimaryBond(pb => primaryBonds.push(pb.savableState()));
    let secondaryBonds = [] as object[];
    this.forEachSecondaryBond(sb => secondaryBonds.push(sb.savableState()));
    let tertiaryBonds = [] as object[];
    this.forEachTertiaryBond(tb => tertiaryBonds.push(tb.savableState()));
    return {
      className: 'Drawing',
      svg: this._svg.svg(),
      sequences: sequences,
      primaryBonds: primaryBonds,
      secondaryBonds: secondaryBonds,
      tertiaryBonds: tertiaryBonds,
    };
  }

  applySavedState(savedState: DrawingSavableState): (void | never) {
    let wasEmpty = this.isEmpty();
    this.clear();
    this._applySavedSvg(savedState);
    this._appendSavedSequences(savedState);
    this._addSavedPrimaryBonds(savedState);
    this._addSavedSecondaryBonds(savedState);
    this._addSavedTertiaryBonds(savedState);
    this.adjustBaseNumbering();
    if (wasEmpty) {
      this.centerView();
    }
  }

  _applySavedSvg(savedState: DrawingSavableState): (void | never) {
    this._svg.clear();
    this._svg.svg(savedState.svg);
    let nested = this._svg.first();
    let vb = nested.viewbox();
    let w = vb.width;
    let h = vb.height;
    let content = nested.svg(false);
    this._svg.clear();
    this._svg.svg(content);
    this.setWidthAndHeight(w, h);
  }

  _appendSavedSequences(savedState: DrawingSavableState): (void | never) {
    savedState.sequences.forEach(saved => {
      let seq = Sequence.fromSavedState(saved, this._svg);
      if (!seq) {
        throw new Error('Unable to create sequence from saved state.');
      }
      this._sequences.push(seq);
      this.fireAddSequence(seq);
    });
  }

  _addSavedPrimaryBonds(savedState: DrawingSavableState): (void | never) {
    savedState.primaryBonds.forEach(saved => {
      let pb = PrimaryBond.fromSavedState(
        saved,
        this._svg,
        (id: string) => this.getBaseById(id),
      );
      if (!pb) {
        throw new Error('Unable to create primary bond from saved state.');
      }
      this._primaryBonds.push(pb);
    });
  }

  _addSavedSecondaryBonds(savedState: DrawingSavableState): (void | never) {
    savedState.secondaryBonds.forEach(saved => {
      let sb = SecondaryBond.fromSavedState(
        saved,
        this._svg,
        (id: string) => this.getBaseById(id),
      );
      if (!sb) {
        throw new Error('Unable to create secondary bond from saved state.');
      }
      this._secondaryBonds.push(sb);
    });
  }

  _addSavedTertiaryBonds(savedState: DrawingSavableState): (void | never) {
    savedState.tertiaryBonds.forEach(saved => {
      let tb = TertiaryBond.fromSavedState(
        saved,
        this._svg,
        (id: string) => this.getBaseById(id),
      );
      if (!tb) {
        throw new Error('Unable to create tertiary bond from saved state.');
      }
      this._tertiaryBonds.push(tb);
      this.fireAddTertiaryBond(tb);
    });
  }

  refreshIds() {
    this.forEachSequence(seq => seq.refreshIds());
    this.forEachPrimaryBond(pb => pb.refreshIds());
    this.forEachSecondaryBond(sb => sb.refreshIds());
    this.forEachTertiaryBond(tb => tb.refreshIds());
  }
}

export default Drawing;
