import type { App } from 'App';

import { removeFileExtension } from 'Parse/parseFileExtension';

import { isBlank } from 'Parse/isBlank';

import { isJSON } from 'Utilities/isJSON';

import * as OpenJSONDrawing from './openJSONDrawing';

import type { JSONDrawing } from './openJSONDrawing';

const errorMessages = {
  'blank-drawing-file': 'Drawing file is empty.',
  'invalid-drawing-file': 'Invalid drawing file.',
};

export type SavedDrawing = (
  { file: File }
);

export class AppWrapper {
  /**
   * The wrapped app.
   */
  readonly app: App;

  constructor(app: App) {
    this.app = app;
  }

  openJSONDrawing(drawing: JSONDrawing): void | never {
    let app = new OpenJSONDrawing.AppWrapper(this.app);
    app.openJSONDrawing(drawing);
  }

  /**
   * Asynchronously opens the saved drawing.
   *
   * Fails if the saved drawing is invalid (i.e., the returned promise
   * is rejected).
   */
  async openDrawing(drawing: SavedDrawing) {
    let { file } = drawing;

    let drawingFileContents = await file.text();

    if (isBlank(drawingFileContents)) {
      throw new Error(errorMessages['blank-drawing-file']);
    }

    if (isJSON(drawingFileContents)) {
      this.openJSONDrawing({ drawingFileContents });
    } else {
      throw new Error(errorMessages['invalid-drawing-file']);
    }

    let drawingTitle = removeFileExtension(file.name);
    drawingTitle = drawingTitle.trim();

    // only specify if necessary
    // (the drawing title can auto-update with changes to the
    // drawing when left unspecified)
    if (drawingTitle != this.app.drawingTitle.value) {
      this.app.drawingTitle.value = drawingTitle;
    }
  }
}
