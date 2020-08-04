import { FoldingModeInterface as FoldingMode } from './FoldingModeInterface';
import setAllBaseHighlightings from './setAllBaseHighlightings';
import Base from '../../Base';
import { selectedRange } from './selected';
import hoveredPairable from './hoveredPairable';
import secondaryBondsWith from './secondaryBondsWith';
import unpair from './unpair';
import pair from './pair';

export function handleMouseoverOnBase(mode: FoldingMode, b: Base) {
  let drawing = mode.strictDrawing.drawing;
  let p = drawing.overallPositionOfBase(b);
  mode.hovered = p;
  if (mode.selected && mode.selecting) {
    mode.selected.looseEnd = p;
  }
  setAllBaseHighlightings(mode);
}

export function handleMouseoutOnBase(mode: FoldingMode, b: Base) {
  mode.hovered = null;
  setAllBaseHighlightings(mode);
}

export function handleMousedownOnBase(mode: FoldingMode, b: Base) {
  if (typeof mode.hovered != 'number') {
    return;
  }
  let rSelected = selectedRange(mode);
  let pairable = hoveredPairable(mode);
  if (rSelected && rSelected.contains(mode.hovered)) {
    if (secondaryBondsWith(mode, rSelected).length > 0) {
      unpair(mode);
    }
  } else if (pairable) {
    pair(mode);
  }
  mode.selected = {
    tightEnd: mode.hovered,
    looseEnd: mode.hovered,
  };
  mode.selecting = true;
  setAllBaseHighlightings(mode);
}

export function handleMousedownOnDrawing(mode: FoldingMode) {
  if (typeof mode.hovered != 'number') {
    mode.reset();
  }
}

export function handleMouseup(mode: FoldingMode) {
  if (mode.disabled()) {
    return;
  }
  mode.selecting = false;
}

export function reset(mode: FoldingMode) {
  mode.hovered = undefined;
  mode.selected = undefined;
  mode.selecting = false;
  setAllBaseHighlightings(mode);
}
