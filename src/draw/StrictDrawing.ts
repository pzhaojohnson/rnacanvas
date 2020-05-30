import {
  StrictDrawingInterface,
  StrictDrawingSavableState,
} from './StrictDrawingInterface';

import Drawing from './Drawing';

import layoutPartnersOfStrictDrawing from './edit/layoutPartnersOfStrictDrawing';

import GeneralStrictLayoutProps from './layout/singleseq/strict/GeneralStrictLayoutProps';
import PerBaseStrictLayoutProps from './layout/singleseq/strict/PerBaseStrictLayoutProps';

import { StrictLayout } from './layout/singleseq/strict/StrictLayout';
import { applyStrictLayout } from './edit/applyStrictLayout';

import {
  appendStructureToStrictDrawing,
  Structure,
} from './edit/appendStructureToStrictDrawing';

interface Svg {
  addTo: () => Svg;
}

interface PerBaseLayoutPropsSavableState {};

class StrictDrawing implements StrictDrawingInterface {
  _drawing: Drawing;
  _generalLayoutProps: GeneralStrictLayoutProps;
  _perBaseLayoutProps: PerBaseStrictLayoutProps[];
  _baseWidth: number;
  _baseHeight: number;

  constructor() {
    this._drawing = new Drawing();

    this._generalLayoutProps = new GeneralStrictLayoutProps();
    this._perBaseLayoutProps = [];
    this._baseWidth = 13.5;
    this._baseHeight = 13.5;
  }

  get drawing(): Drawing {
    return this._drawing;
  }

  addTo(container: Node, SVG: () => Svg) {
    this._drawing.addTo(container, SVG);
  }

  layoutPartners(): (number | null)[] {
    return layoutPartnersOfStrictDrawing(this);
  }

  generalLayoutProps(): GeneralStrictLayoutProps {
    if (!this._generalLayoutProps) {
      this._generalLayoutProps = new GeneralStrictLayoutProps();
    }
    return this._generalLayoutProps.deepCopy();
  }

  setGeneralLayoutProps(props: GeneralStrictLayoutProps) {
    if (props) {
      this._generalLayoutProps = props;
    }
  }

  perBaseLayoutProps(): PerBaseStrictLayoutProps[] {
    if (!this._perBaseLayoutProps) {
      this._perBaseLayoutProps = [];
    }
    return PerBaseStrictLayoutProps.deepCopyArray(
      this._perBaseLayoutProps
    );
  }

  setPerBaseLayoutProps(props: PerBaseStrictLayoutProps[]) {
    if (props) {
      this._perBaseLayoutProps = props;
    }
  }

  get baseWidth(): number {
    return this._baseWidth;
  }

  set baseWidth(bw: number) {
    this._baseWidth = bw;
  }

  get baseHeight(): number {
    return this._baseHeight;
  }

  set baseHeight(bh: number) {
    this._baseHeight = bh;
  }

  /**
   * Returns null if a layout cannot be created given
   * the current state of the strict drawing.
   */
  layout(): (StrictLayout | null) {
    let layout = null;
    try {
      layout = new StrictLayout(
        this.layoutPartners(),
        this.generalLayoutProps(),
        this.perBaseLayoutProps(),
      );
    } catch (err) {
      console.error('Unable to create layout for strict drawing.');
      return null;
    }
    return layout;
  }

  applyLayout() {
    let layout = this.layout();
    if (layout) {
      applyStrictLayout(
        this._drawing,
        this.layout(),
        this.baseWidth,
        this.baseHeight,
      );
    }
  }

  hasFlatOutermostLoop(): boolean {
    if (this._generalLayoutProps) {
      return this._generalLayoutProps.outermostLoopShape === 'flat';
    }
    return false;
  }

  flatOutermostLoop() {
    if (this.hasFlatOutermostLoop()) {
      return;
    }
    if (!this._generalLayoutProps) {
      this._generalLayoutProps = new GeneralStrictLayoutProps();
    }
    this._generalLayoutProps.outermostLoopShape = 'flat';
    this.applyLayout();
  }

  hasRoundOutermostLoop(): boolean {
    return !this.hasFlatOutermostLoop();
  }

  roundOutermostLoop() {
    if (this.hasRoundOutermostLoop()) {
      return;
    }
    if (!this._generalLayoutProps) {
      this._generalLayoutProps = new GeneralStrictLayoutProps();
    }
    this._generalLayoutProps.outermostLoopShape = 'round';
    this.applyLayout();
  }
  
  savableState(): StrictDrawingSavableState {
    if (!this._generalLayoutProps) {
      this._generalLayoutProps = new GeneralStrictLayoutProps();
    }
    if (!this._perBaseLayoutProps) {
      this._perBaseLayoutProps = [];
    }
    let state = {
      className: 'StrictDrawing',
      drawing: this._drawing.savableState(),
      generalLayoutProps: this._generalLayoutProps.savableState(),
      perBaseLayoutProps: [] as PerBaseLayoutPropsSavableState[],
      baseWidth: this._baseWidth,
      baseHeight: this._baseHeight,
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
   * this drawing will not be affected.
   * 
   * Returns true if the saved state was successfully applied.
   */
  applySavedState(savedState: StrictDrawingSavableState) {
    let prevState = this.savableState();
    try {
      this.drawing.applySavedState(savedState.drawing);
      this._applySavedGeneralLayoutProps(savedState);
      this._applySavedPerBaseLayoutProps(savedState);
      this._applySavedBaseWidthAndHeight(savedState);
    } catch (err) {
      console.error('Unable to apply saved state.');
      this.applySavedState(prevState);
      return false;
    }
    return true;
  }

  _applySavedGeneralLayoutProps(savedState: StrictDrawingSavableState) {
    if (!savedState.generalLayoutProps) {
      this._generalLayoutProps = new GeneralStrictLayoutProps();
      return;
    }
    let props = GeneralStrictLayoutProps.fromSavedState(savedState.generalLayoutProps);
    if (!props) {
      throw new Error('Unable to apply general layout properties.');
    }
    this._generalLayoutProps = props;
  }

  _applySavedPerBaseLayoutProps(savedState: StrictDrawingSavableState) {
    this._perBaseLayoutProps = [];
    if (!savedState.perBaseLayoutProps) {
      return;
    }
    savedState.perBaseLayoutProps.forEach((savedProps, i) => {
      if (savedProps) {
        let props = PerBaseStrictLayoutProps.fromSavedState(savedProps);
        if (!props) {
          throw new Error('Unable to apply per base layout properties.');
        }
        this._perBaseLayoutProps[i] = props;
      }
    });
  }

  _applySavedBaseWidthAndHeight(savedState: StrictDrawingSavableState) {
    if (typeof savedState.baseWidth !== 'number') {
      throw new Error('Unable to apply base width.');
    }
    if (typeof savedState.baseHeight !== 'number') {
      throw new Error('Unable to apply base height.');
    }
    this._baseWidth = savedState.baseWidth;
    this._baseHeight = savedState.baseHeight;
  }

  refreshIds() {
    this.drawing.refreshIds();
  }
  
  get zoom(): number {
    return this._drawing.zoom;
  }

  set zoom(z: number) {
    this._drawing.zoom = z;
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
