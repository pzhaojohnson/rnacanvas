import type { App } from 'App';

import { parseCTString } from './parseCTString';
import { splitSecondaryAndTertiaryPairs } from './splitSecondaryAndTertiaryPairs';

import { updateBaseNumberings } from 'Draw/sequences/updateBaseNumberings';
import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

import { removeFileExtension } from 'Parse/parseFileExtension';
import { isBlank } from 'Parse/isBlank';

import { atIndex } from 'Array/at';

export type Args = {
  ctFile: File;

  /**
   * A reference to the whole app.
   */
  app: App;
};

/**
 * Returns a promise that opens the CT file in the app.
 *
 * Fails for invalid CT files.
 */
export function openCTFile(args: Args) {
  return new Promise<void>((resolve, reject) => {
    let ctFile = args.ctFile;
    let app = args.app;
    let drawing = app.drawing;
    let drawingInteraction = app.drawingInteraction;

    ctFile.text().then(ctString => {
      let ctData = parseCTString(ctString);

      let { secondaryPartners, tertiaryPartners } = (
        splitSecondaryAndTertiaryPairs(ctData.partners)
      );

      drawing.appendStructure({
        id: ctData.sequenceId,
        characters: ctData.sequence,
        secondaryPartners,
        tertiaryPartners,
      });

      // the sequence of the appended structure
      let sequence = atIndex(drawing.sequences, drawing.sequences.length - 1);

      // don't add numberings when using AES default values
      if (sequence && defaultValues?.toUpperCase() != 'AES') {
        let numberingIncrement = 20;
        updateBaseNumberings(sequence, {
          offset: ctData.numberingOffset,
          increment: numberingIncrement,
          anchor: Math.min(numberingIncrement, sequence.length),
        });
        orientBaseNumberings(drawing.drawing);
      }

      // only explicitly specify the drawing title if necessary
      // (since the drawing title can auto-update if left unspecified)
      let drawingTitle = removeFileExtension(ctFile.name);
      if (!isBlank(drawingTitle) && drawingTitle != app.drawingTitle.value) {
        app.drawingTitle.value = drawingTitle;
      }

      // for when the structure in the CT file lacks base-pairs
      if (drawing.secondaryBonds.length == 0) {
        drawing.flatOutermostLoop();
        let bindingTool = drawingInteraction.bindingTool;
        drawingInteraction.currentTool = bindingTool;
        bindingTool.showComplements = false;
      }

      resolve();
    }).catch(reject);
  });
}

const defaultValues = (new URL(window.location.href)).searchParams.get('default_values');
