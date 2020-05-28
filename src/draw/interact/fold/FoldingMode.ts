import FoldingModeInterface from './FoldingModeInterface';
import StrictDrawing from '../../StrictDrawing';
import Base from '../../Base';

import handleMouseoverOnBase from './handleMouseoverOnBase';
import handleMouseoutOnBase from './handleMouseoutOnBase';
import handleMousedownOnBase from './handleMousedownOnBase';
import handleMouseup from './handleMouseup';
import handleMousedownOnDrawing from './handleMousedownOnDrawing';
import removeAllBaseHighlightings from '../highlight/removeAllBaseHighlightings';

class FoldingMode implements FoldingModeInterface {
  _strictDrawing: StrictDrawing;
  hovered: number | null;
  selected: {
    tightEnd: number,
    looseEnd: number
  } | null;
  _selecting: boolean;

  _disabled: boolean;

  _onShouldPushUndo: () => void;
  _onChange: () => void;

  constructor(strictDrawing: StrictDrawing) {
    this._strictDrawing = strictDrawing;

    this._setBindings();
  }

  get className(): string {
    return 'FoldingMode';
  }

  get strictDrawing(): StrictDrawing {
    return this._strictDrawing;
  }

  get minSelected(): (number | null) {
    if (!this.selected) {
      return null;
    }
    return Math.min(
      this.selected.tightEnd,
      this.selected.looseEnd,
    );
  }

  get maxSelected(): (number | null) {
    if (!this.selected) {
      return null;
    }
    return Math.max(
      this.selected.tightEnd,
      this.selected.looseEnd,
    );
  }

  get selectedLength(): (number | null) {
    if (!this.selected) {
      return 0;
    }
    return this.maxSelected - this.minSelected + 1;
  }

  get selectedCharacters(): string {
    if (!this.selected) {
      return '';
    }
    let cs = this.strictDrawing.drawing.overallCharacters;
    return cs.substring(
      this.minSelected - 1,
      this.maxSelected,
    );
  }

  withinSelected(p: number): boolean {
    if (!this.selected) {
      return;
    }
    return p >= this.minSelected && p <= this.maxSelected;
  }

  overlapsSelected(position5: number, position3: number): boolean {
    if (!this.selected) {
      return false;
    }
    return this.withinSelected(position5) || this.withinSelected(position3);    
  }

  hoveringSelected(): boolean {
    if (!this.hovered || !this.selected) {
      return false;
    }
    return this.withinSelected(this.hovered);
  }

  startSelecting() {
    this._selecting = true;
  }

  stopSelecting() {
    this._selecting = false;
  }

  selecting(): boolean {
    return this._selecting;
  }

  handleMouseoverOnBase(b: Base) {
    handleMouseoverOnBase(this, b);
  }

  handleMouseoutOnBase(b: Base) {
    handleMouseoutOnBase(this, b);
  }

  handleMousedownOnBase(b: Base) {
    handleMousedownOnBase(this, b);
  }

  handleMousedownOnDrawing() {  
    handleMousedownOnDrawing(this);
  }

  _setBindings() {
    window.addEventListener('mouseup', () => {
      handleMouseup(this);
    });
  }

  reset() {
    this.hovered = null;
    this.selected = null;
    removeAllBaseHighlightings(this.strictDrawing.drawing);
  }

  disable() {
    this._disabled = true;
  }

  disabled(): boolean {
    return this._disabled;
  }

  enable() {
    this._disabled = false;
  }

  enabled() {
    return !this.disabled();
  }

  onShouldPushUndo(f: () => void) {
    this._onShouldPushUndo = f;
  }

  fireShouldPushUndo() {
    if (this._onShouldPushUndo) {
      this._onShouldPushUndo();
    }
  }

  onChange(f: () => void) {
    this._onChange = f;
  }

  fireChange() {
    if (this._onChange) {
      this._onChange();
    }
  }
}

export default FoldingMode;
