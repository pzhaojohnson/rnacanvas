import type { App } from 'App';
import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import * as SVG from '@svgdotjs/svg.js';

import { DrawingOverlay } from 'Draw/interact/DrawingOverlay';
import { OverlaidMessageContainer } from 'Draw/interact/OverlaidMessageContainer';

import { DraggingTool } from 'Draw/interact/drag/DraggingTool';
import { BindingTool } from 'Draw/interact/bind/BindingTool';
import { FlippingTool } from 'Draw/interact/flip/FlippingTool';
import { FlatteningTool } from 'Draw/interact/flatten/FlatteningTool';
import { EditingTool } from 'Draw/interact/edit/EditingTool';

export type Options = {

  // a reference to the whole app
  app: App;

  // the strict drawing to manage interaction with
  strictDrawing: StrictDrawing;

  // for specifying alternatives to components of the SVG.js library
  // (such as alternative components compatible with Node.js)
  SVG?: {
    SVG?: () => SVG.Svg;
  }
}

export type Tool = (
  DraggingTool
  | BindingTool
  | FlippingTool
  | FlatteningTool
  | EditingTool
);

export class StrictDrawingInteraction {
  readonly options: Options;

  readonly drawingOverlay: DrawingOverlay;
  readonly drawingUnderlay: DrawingOverlay;

  readonly overlaidMessageContainer: OverlaidMessageContainer;

  readonly draggingTool: DraggingTool;
  readonly bindingTool: BindingTool;
  readonly flippingTool: FlippingTool;
  readonly flatteningTool: FlatteningTool;
  readonly editingTool: EditingTool;
  _currentTool: Tool;

  constructor(options: Options) {
    this.options = options;

    this.drawingOverlay = new DrawingOverlay({ SVG: options?.SVG });
    this.drawingOverlay.placeOver(this.strictDrawing.drawing);
    this.drawingUnderlay = new DrawingOverlay({ SVG: options?.SVG });
    this.drawingUnderlay.placeUnder(this.strictDrawing.drawing);

    this.overlaidMessageContainer = new OverlaidMessageContainer();
    this.overlaidMessageContainer.placeOver(this.strictDrawing.drawing);

    this.draggingTool = new DraggingTool({
      app: options.app,
      strictDrawing: options.strictDrawing,
      drawingUnderlay: this.drawingUnderlay,
      overlaidMessageContainer: this.overlaidMessageContainer,
    });

    this.bindingTool = new BindingTool({
      app: options.app,
      strictDrawing: options.strictDrawing,
      drawingOverlay: this.drawingOverlay,
      drawingUnderlay: this.drawingUnderlay,
      overlaidMessageContainer: this.overlaidMessageContainer,
    });

    this.flippingTool = new FlippingTool({
      app: options.app,
      strictDrawing: options.strictDrawing,
      drawingUnderlay: this.drawingUnderlay,
      overlaidMessageContainer: this.overlaidMessageContainer,
    });

    this.flatteningTool = new FlatteningTool({
      app: options.app,
      strictDrawing: options.strictDrawing,
      drawingUnderlay: this.drawingUnderlay,
      overlaidMessageContainer: this.overlaidMessageContainer,
    });

    this.editingTool = new EditingTool({
      app: options.app,
      strictDrawing: options.strictDrawing,
      drawingOverlay: this.drawingOverlay,
      overlaidMessageContainer: this.overlaidMessageContainer,
      SVG: options?.SVG,
    });

    this._currentTool = this.draggingTool;

    window.addEventListener('mouseover', event => {
      this.currentTool.handleMouseover(event);
    });

    window.addEventListener('mouseout', event => {
      this.currentTool.handleMouseout(event);
    });

    window.addEventListener('mousedown', event => {
      this.currentTool.handleMousedown(event);
    });

    window.addEventListener('mousemove', event => {
      this.currentTool.handleMousemove(event);
    });

    window.addEventListener('mouseup', event => {
      this.currentTool.handleMouseup(event);
    });

    window.addEventListener('dblclick', event => {
      this.currentTool.handleDblclick(event);
    });

    window.addEventListener('keyup', event => {
      this.currentTool.handleKeyup(event);
    });
  }

  get app() {
    return this.options.app;
  }

  get strictDrawing() {
    return this.options.strictDrawing;
  }

  /**
   * An alias for the binding tool.
   */
  get pairingTool() {
    return this.bindingTool;
  }

  get currentTool(): Tool {
    return this._currentTool;
  }

  set currentTool(t: Tool) {
    if (t != this._currentTool) {
      this._currentTool.reset();
      this._currentTool = t;
      this.app.refresh();
    }
  }

  reset() {
    this.currentTool.reset();
  }

  refresh() {
    this.currentTool.refresh();
  }
}
