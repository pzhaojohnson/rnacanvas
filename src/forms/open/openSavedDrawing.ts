import type { App } from 'App';
import type { Drawing } from 'Draw/Drawing';
import type { StrictDrawing } from 'Draw/strict/StrictDrawing';

import { parseRna2drawer1 } from './parseRna2drawer1';
import { addRna2drawer1 } from './addRna2drawer1';
import { StrictDrawingSavableState } from 'Draw/strict/StrictDrawing';

import { removeCircleHighlighting } from 'Draw/bases/annotate/circle/add';

import { parseFileExtension } from 'Parse/parseFileExtension';
import { removeFileExtension } from 'Parse/parseFileExtension';

import { isJSON } from 'Utilities/isJSON';

// no highlightings from user interaction should carry over
// when opening a saved drawing
function removeAllBaseHighlightings(drawing: Drawing | StrictDrawing) {
  drawing.bases().forEach(b => removeCircleHighlighting(b));
}

function openRna2drawer1(
  args: {
    app: App,
    contents: string,
  },
): boolean {
  let { app, contents } = args;

  let rna2drawer1 = parseRna2drawer1(contents);
  if (rna2drawer1) {
    addRna2drawer1(app.strictDrawing, rna2drawer1);
    app.refresh();
    return true;
  }
  return false;
}

function openRna2drawer2(
  args: {
    app: App,
    contents: string,
  },
): boolean {
  let { app, contents } = args;

  try {
    let savedState = JSON.parse(contents);
    let applied = app.strictDrawing.applySavedState(savedState as StrictDrawingSavableState);
    if (applied) {
      app.strictDrawing.updateLayout(); // adjust padding of drawing for current screen
      removeAllBaseHighlightings(app.drawing);
      return true;
    }
  } catch (err) {}
  return false;
}

function updateDrawingTitle(app: App, fileName: string) {
  let titleFromFileName = removeFileExtension(fileName).trim();
  if (titleFromFileName != app.drawingTitle.unspecifiedValue) {
    // only specify if necessary since a specified title doesn't update
    // automatically as the drawing changes
    app.drawingTitle.value = titleFromFileName;
  }
}

export type Args = {
  /**
   * A reference to the whole app.
   */
  app: App;

  savedDrawing: File;
}

/**
 * Asynchronously opens the saved drawing.
 *
 * Fails if the saved drawing is invalid (i.e., the returned promise is
 * rejected).
 */
export function openSavedDrawing(args: Args) {
  let { app, savedDrawing } = args;

  let fileName = savedDrawing.name;
  let fileExtension = parseFileExtension(fileName);

  let hasRNAcanvasExtension = (
    fileExtension.toLowerCase().includes('rnacanvas')
  );

  let hasRNA2DrawerExtension = (
    fileExtension.toLowerCase().includes('rna2drawer')
  );

  return new Promise<void>((resolve, reject) => {
    if (!hasRNAcanvasExtension && !hasRNA2DrawerExtension) {
      reject(new Error('Drawing files must have .rnacanvas or .rna2drawer extension.'));
    }

    savedDrawing.text().then(text => {
      let opened = false;

      /* Some users might lose the trailing "2" in the .rna2drawer2 file
      extension if they were to open the file in a text editor and type
      in the name and extension of the file themselves when saving. Best
      to check the actual contents of drawing files to differentiate
      between drawing formats. */
      if (isJSON(text)) {
        opened = openRna2drawer2({ app, contents: text });
      } else {
        opened = openRna2drawer1({ app, contents: text });
      }

      if (!opened) {
        throw new Error('Invalid drawing file.');
      }

      updateDrawingTitle(app, fileName);

      resolve();
    }).catch(reject);
  });
}
