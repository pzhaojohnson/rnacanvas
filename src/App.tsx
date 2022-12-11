import styles from './App.css';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { StrictDrawingSavableState } from 'Draw/strict/StrictDrawing';
import * as SVG from '@svgdotjs/svg.js';

import { StrictDrawingInteraction } from './draw/interact/StrictDrawingInteraction';

import { DrawingTitle } from './DrawingTitle';

import UndoRedo from './undo/UndoRedo';
import { pushUndo, undo, redo } from './undo/undo';

import { Preferences } from './Preferences';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Menu } from './menu/Menu';
import { Infobar } from './infobar/Infobar';

import { FormContainer } from './FormContainer';
import { WelcomePage } from './forms/welcome/WelcomePage';

export type Options = {

  // for specifying alternatives to components of the SVG.js library
  // (such as those compatible with unit testing on Node.js)
  SVG?: {
    SVG?: () => SVG.Svg;
  }
}

export class App {
  readonly node: HTMLDivElement;
  readonly menuContainer: HTMLDivElement;
  readonly drawingContainer: HTMLDivElement;
  readonly formContainer: FormContainer;
  readonly infobarContainer: HTMLDivElement;

  readonly strictDrawing: StrictDrawing;
  readonly strictDrawingInteraction: StrictDrawingInteraction;
  drawingTitle: DrawingTitle;

  readonly undoRedo: UndoRedo<StrictDrawingSavableState>;

  preferences: Preferences;

  constructor(options?: Options) {
    this.node = document.createElement('div');
    this.node.className = styles.app;

    this.menuContainer = document.createElement('div');
    this.menuContainer.className = styles.menuContainer;
    this.node.appendChild(this.menuContainer);

    let drawingAndFormContainer = document.createElement('div');
    drawingAndFormContainer.className = styles.drawingAndFormContainer;
    this.node.appendChild(drawingAndFormContainer);

    this.drawingContainer = document.createElement('div');
    this.drawingContainer.className = styles.drawingContainer;
    drawingAndFormContainer.appendChild(this.drawingContainer);

    this.formContainer = new FormContainer();
    this.formContainer.appendTo(drawingAndFormContainer);

    this.infobarContainer = document.createElement('div');
    this.node.appendChild(this.infobarContainer);

    this.strictDrawing = new StrictDrawing({ SVG: options?.SVG });
    this.strictDrawing.appendTo(this.drawingContainer);

    this.strictDrawingInteraction = new StrictDrawingInteraction({
      app: this,
      strictDrawing: this.strictDrawing,
      SVG: options?.SVG,
    });

    this.drawingTitle = new DrawingTitle({ drawing: this.strictDrawing });

    this.undoRedo = new UndoRedo<StrictDrawingSavableState>();

    this.preferences = new Preferences();

    this.refresh();

    this.formContainer.renderForm(() => (
      <WelcomePage app={this} />
    ));
  }

  appendTo(container: Node) {
    container.appendChild(this.node);
  }

  remove() {
    this.node.remove();
  }

  get drawing() {
    return this.strictDrawing;
  }

  get drawingInteraction() {
    return this.strictDrawingInteraction;
  }

  updateDocumentTitle() {
    document.title = this.drawing.isEmpty() ? 'RNAcanvas' : this.drawingTitle.value;
  }

  refresh() {
    // refresh first since others might depend on it
    this.strictDrawingInteraction.refresh();

    ReactDOM.render(<Menu app={this} />, this.menuContainer);
    ReactDOM.render(<Infobar app={this} />, this.infobarContainer);
    this.formContainer.refresh();
    this.updateDocumentTitle();
  }

  pushUndo() {
    pushUndo(this);
  }

  canUndo(): boolean {
    return this.undoRedo.canUndo();
  }

  undo() {
    undo(this);
  }

  canRedo(): boolean {
    return this.undoRedo.canRedo();
  }

  redo() {
    redo(this);
  }
}
