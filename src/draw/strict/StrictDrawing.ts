import { Drawing } from 'Draw/Drawing';
import { Options } from 'Draw/Drawing';
import { DrawingSavableState } from 'Draw/Drawing';

import { Sequence } from 'Draw/sequences/Sequence';

import { Partners } from 'Partners/Partners';
import layoutPartnersOfStrictDrawing from 'Draw/edit/layoutPartnersOfStrictDrawing';

import {
  GeneralStrictLayoutProps as GeneralLayoutProps,
  GeneralStrictLayoutPropsSavableState as GeneralLayoutPropsSavableState,
} from 'Draw/strict/layout/GeneralStrictLayoutProps';
import {
  PerBaseStrictLayoutProps as PerBaseLayoutProps,
  PerBaseStrictLayoutPropsSavableState as PerBaseLayoutPropsSavableState,
} from 'Draw/strict/layout/PerBaseStrictLayoutProps';

import { updateLayout, Options as UpdateLayoutOptions } from 'Draw/edit/updateLayout';

import {
  appendStructureToStrictDrawing,
  Structure,
} from 'Draw/edit/appendStructureToStrictDrawing';

export interface StrictDrawingSavableState {
  className: string;
  drawing: DrawingSavableState;
  generalLayoutProps: GeneralLayoutPropsSavableState;
  perBaseLayoutProps: PerBaseLayoutPropsSavableState[];
  baseWidth: number;
  baseHeight: number;
}

export class StrictDrawing {
  _drawing: Drawing;
  generalLayoutProps: GeneralLayoutProps;
  _perBaseLayoutProps: PerBaseLayoutProps[];
  baseWidth: number;
  baseHeight: number;

  constructor(options?: Options) {
    this._drawing = new Drawing(options);

    this.generalLayoutProps = new GeneralLayoutProps();
    this._perBaseLayoutProps = [];
    this.baseWidth = 12;
    this.baseHeight = 12;
  }

  get drawing(): Drawing {
    return this._drawing;
  }

  get node() {
    return this.drawing.node;
  }

  appendTo(container: Node) {
    container.appendChild(this.node);
  }

  /**
   * A way to express what the drawing was initially produced from
   * (e.g., an RNA 2D schema).
   */
  get origin() {
    return this.drawing.origin;
  }

  set origin(origin) {
    this.drawing.origin = origin;
  }

  /**
   * Returns the SVG document of the strict drawing.
   */
  get svg() {
    return this.drawing.svg;
  }

  get svgContainer() {
    return this.drawing.svgContainer;
  }

  get scroll() {
    return this.drawing.scroll;
  }

  get sequences() {
    return this.drawing.sequences;
  }

  bases() {
    return this.drawing.bases();
  }

  get primaryBonds() {
    return this.drawing.primaryBonds;
  }

  get secondaryBonds() {
    return this.drawing.secondaryBonds;
  }

  get tertiaryBonds() {
    return this.drawing.tertiaryBonds;
  }

  layoutSequence(): Sequence {
    let id = this.drawing.sequences.map(seq => seq.id).join(', ');
    let seq = new Sequence(id);
    seq.bases.push(...this.drawing.sequences.flatMap(seq => seq.bases));
    return seq;
  }

  layoutPartners(): Partners {
    return layoutPartnersOfStrictDrawing(this);
  }

  perBaseLayoutProps(): PerBaseLayoutProps[] {
    if (!this._perBaseLayoutProps) {
      this._perBaseLayoutProps = [];
    }
    let missing = [] as number[];
    this._perBaseLayoutProps.forEach((props, i) => {
      if (!props) {
        missing.push(i);
      }
    });
    missing.forEach(i => {
      this._perBaseLayoutProps[i] = new PerBaseLayoutProps();
    });
    return PerBaseLayoutProps.deepCopyArray(
      this._perBaseLayoutProps
    );
  }

  setPerBaseLayoutProps(props: PerBaseLayoutProps[]) {
    if (props) {
      this._perBaseLayoutProps = props;
    }
  }

  updateLayout(options?: UpdateLayoutOptions) {
    if (options) {
      updateLayout(this, options);
    } else {
      updateLayout(this);
    }
  }

  hasFlatOutermostLoop(): boolean {
    if (this.generalLayoutProps) {
      return this.generalLayoutProps.outermostLoopShape === 'flat';
    }
    return false;
  }

  flatOutermostLoop() {
    if (this.hasFlatOutermostLoop()) {
      return;
    }
    if (!this.generalLayoutProps) {
      this.generalLayoutProps = new GeneralLayoutProps();
    }
    this.generalLayoutProps.outermostLoopShape = 'flat';
    this.updateLayout();
  }

  hasRoundOutermostLoop(): boolean {
    return !this.hasFlatOutermostLoop();
  }

  roundOutermostLoop() {
    if (this.hasRoundOutermostLoop()) {
      return;
    }
    if (!this.generalLayoutProps) {
      this.generalLayoutProps = new GeneralLayoutProps();
    }
    this.generalLayoutProps.outermostLoopShape = 'round';
    this.updateLayout();
  }

  savableState(): StrictDrawingSavableState {
    if (!this.generalLayoutProps) {
      this.generalLayoutProps = new GeneralLayoutProps();
    }
    if (!this._perBaseLayoutProps) {
      this._perBaseLayoutProps = [];
    }
    let state = {
      className: 'StrictDrawing',
      drawing: this._drawing.savableState(),
      generalLayoutProps: this.generalLayoutProps.savableState(),
      perBaseLayoutProps: [] as PerBaseLayoutPropsSavableState[],
      baseWidth: this.baseWidth,
      baseHeight: this.baseHeight,
    };
    this._perBaseLayoutProps.forEach((props, i) => {
      if (props) {
        state.perBaseLayoutProps[i] = props.savableState();
      }
    });
    return state;
  }

  get savableString(): string {
    let savableState = this.savableState();
    return JSON.stringify(savableState, null, ' ');
  }

  /**
   * If the saved state cannot be successfully applied, the state of
   * the drawing will not be affected.
   *
   * Returns true if the saved state was successfully applied.
   */
  applySavedState(savedState: StrictDrawingSavableState): boolean {
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

  _applySavedState(savedState: StrictDrawingSavableState): (void | never) {
    if (savedState.className !== 'StrictDrawing') {
      throw new Error('Wrong class name.');
    }
    if (!this.drawing.applySavedState(savedState.drawing)) {
      throw new Error('Unable to apply saved state to drawing.');
    };
    this._applySavedGeneralLayoutProps(savedState);
    this._applySavedPerBaseLayoutProps(savedState);
    this._applySavedBaseWidthAndHeight(savedState);
  }

  _applySavedGeneralLayoutProps(savedState: StrictDrawingSavableState): (void | never) {
    if (!savedState.generalLayoutProps) {
      this.generalLayoutProps = new GeneralLayoutProps();
      return;
    }
    let props = GeneralLayoutProps.fromSavedState({ ...savedState.generalLayoutProps });
    this.generalLayoutProps = props;
  }

  _applySavedPerBaseLayoutProps(savedState: StrictDrawingSavableState): (void | never) {
    this._perBaseLayoutProps = [];
    if (!savedState.perBaseLayoutProps) {
      return;
    }
    savedState.perBaseLayoutProps.forEach((savedProps, i) => {
      if (savedProps) {
        let props = PerBaseLayoutProps.fromSavedState({ ...savedProps });
        this._perBaseLayoutProps[i] = props;
      }
    });
  }

  _applySavedBaseWidthAndHeight(savedState: StrictDrawingSavableState): (void | never) {
    if (typeof savedState.baseWidth !== 'number') {
      throw new Error('Unable to apply saved base width.');
    }
    if (typeof savedState.baseHeight !== 'number') {
      throw new Error('Unable to apply saved base height.');
    }
    this.baseWidth = savedState.baseWidth;
    this.baseHeight = savedState.baseHeight;
  }

  isEmpty(): boolean {
    return this._drawing.isEmpty();
  }

  sequenceIds(): string[] {
    return this._drawing.sequenceIds();
  }

  /**
   * Returns true if the sequence was successfully appended.
   */
  appendSequence(id: string, characters: string): boolean {
    return this.appendStructure({
      id: id,
      characters: characters,
    });
  }

  /**
   * Returns true if the structure was successfully appended.
   */
  appendStructure(structure: Structure): boolean {
    return appendStructureToStrictDrawing(this, structure);
  }

  get svgString(): string {
    return this._drawing.svgString;
  }
}

export default StrictDrawing;
