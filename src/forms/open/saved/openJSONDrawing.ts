import type { App } from 'App';

import { removeCircleHighlighting } from 'Draw/bases/outlines/circle/add';

import { DrawingOriginChecker } from 'Draw/origin/DrawingOriginChecker';

let drawingOriginChecker = new DrawingOriginChecker();

/**
 * A JSON drawing is a drawing that was created by the RNAcanvas web app
 * (formerly named the RNA2Drawer web app).
 *
 * In contrast, a legacy drawing is one created by the earlier
 * desktop-based RNA2Drawer app.
 */
export type JSONDrawing = (
  { drawingFileContents: string }
);

export class AppWrapper {
  /**
   * The wrapped app.
   */
  readonly app: App;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Opens the JSON drawing in the app.
   *
   * Throws if the JSON drawing is invalid.
   */
  openJSONDrawing(drawing: JSONDrawing): void | never {
    let { drawingFileContents } = drawing;

    let json = JSON.parse(drawingFileContents); // can throw

    let applied = this.app.strictDrawing.applySavedState(json as any);

    if (!applied) {
      throw new Error('Invalid drawing file.');
    }

    // adjusts the padding of the drawing to the current screen
    this.app.drawing.updateLayout();

    // remove any lingering base highlightings
    this.app.drawing.bases().forEach(b => removeCircleHighlighting(b));

    // the drawing origin can affect the initial tool
    if (drawingOriginChecker.originIsAnRNA2DSchema(this.app.drawing)) {
      let editingTool = this.app.drawingInteraction.editingTool;
      this.app.drawingInteraction.currentTool = editingTool;
    }
  }
}
