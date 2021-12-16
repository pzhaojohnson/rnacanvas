import * as SVG from '@svgdotjs/svg.js';
import {
  StrictDrawingInterface as StrictDrawing,
  StrictDrawingSavableState,
} from 'Draw/strict/StrictDrawingInterface';
import UndoRedo from './undo/UndoRedo';
import StrictDrawingInteraction from './draw/interact/StrictDrawingInteraction';
import * as React from 'react';

export interface FormFactory {
  (close: () => void): React.ReactElement;
}

export interface AppInterface {
  readonly SVG: () => SVG.Svg;
  readonly strictDrawing: StrictDrawing;
  readonly undoRedo: UndoRedo<StrictDrawingSavableState>;
  readonly strictDrawingInteraction: StrictDrawingInteraction;

  renderPeripherals(): void;
  renderForm(formFactory: FormFactory): void;
  unmountForm(): void;
  drawingTitle: string;
  unspecifyDrawingTitle(): void;
  updateDocumentTitle(): void;
  refresh(): void;

  pushUndo(): void;
  canUndo(): boolean;
  undo(): void;
  canRedo(): boolean;
  redo(): void;
}
