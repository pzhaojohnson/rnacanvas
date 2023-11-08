import styles from './App.css';

import { StrictDrawing } from 'Draw/strict/StrictDrawing';
import { StrictDrawingSavableState } from 'Draw/strict/StrictDrawing';
import * as SVG from '@svgdotjs/svg.js';

import { StrictDrawingInteraction } from './draw/interact/StrictDrawingInteraction';

import { DrawingTitle } from './DrawingTitle';

import UndoRedo from './undo/UndoRedo';
import { pushUndo, undo, redo } from './undo/undo';

import { Settings } from 'Settings/Settings';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Menu } from './menu/Menu';
import { Infobar } from './infobar/Infobar';

import { FormContainer } from './FormContainer';

import { Signaller } from 'Utilities/Signaller';

import { fetchRNA2DSchema } from 'Foreign/RNA2D/fetchRNA2DSchema';

import { createRNAcanvasDrawingFragment } from 'Foreign/RNA2D/convert/schemas/createRNAcanvasDrawingFragment';

import { DuplicateSecondaryBondsRemoverBuilder } from 'Foreign/RNA2D/duplicate-base-pairs/DuplicateSecondaryBondsRemoverBuilder';

import { DrawingViewCentererBuilder } from 'Draw/view/DrawingViewCentererBuilder';

import { DrawingOriginSetter } from 'Draw/origin/DrawingOriginSetter';

let drawingViewCentererBuilder = new DrawingViewCentererBuilder();
let drawingViewCenterer = drawingViewCentererBuilder.build();

let drawingOriginSetter = new DrawingOriginSetter();

export type RNA2DSchemaLike = (
  {
    /**
     * A URL to an RNA 2D schema.
     */
    url: string;
  }
);

let duplicateSecondaryBondsRemoverBuilder = new DuplicateSecondaryBondsRemoverBuilder();

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

  settings: Settings;

  /**
   * Can be used to listen for when the app is refreshed.
   */
  readonly refreshSignaller = new Signaller();

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
    this.infobarContainer.classList.add(styles.infobarContainer);
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

    this.settings = new Settings();

    this.refresh();
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

    this.refreshSignaller.signal();
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

  async openRNA2DSchema(args: RNA2DSchemaLike) {
    let { url } = args;
    let rna2DSchema = await fetchRNA2DSchema({ url });

    let drawingFragment = createRNAcanvasDrawingFragment({ rna2DSchema });
    drawingFragment.appendTo(this.drawing);

    let duplicateSecondaryBondsRemover = duplicateSecondaryBondsRemoverBuilder.buildFor(this.drawing);
    duplicateSecondaryBondsRemover.remove();

    drawingOriginSetter.setOriginToAnRNA2DSchema(this.drawing);

    this.drawingInteraction.currentTool = this.drawingInteraction.editingTool;

    this.refresh();
    drawingViewCenterer.applyTo(this.drawing);
  }
}
