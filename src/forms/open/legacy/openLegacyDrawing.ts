import type { App } from 'App';

import type { Sequence } from 'Draw/sequences/Sequence';
import { SequenceWrapper } from './SequenceWrapper';

import type { Base } from 'Draw/bases/Base';
import { BaseWrapper } from './BaseWrapper';

import { ArrayWrapper } from './ArrayWrapper';

import type { Partners as PartnersNotation } from 'Partners/Partners';

import { parseLegacyDrawing } from './parseLegacyDrawing';

import { orientBaseNumberings } from 'Draw/bases/numberings/orient';

import * as DrawTertiaryInteraction from './drawTertiaryInteraction';

import type { TertiaryInteractionSpec } from './drawTertiaryInteraction';

function wrapBase(base: Base): BaseWrapper {
  return new BaseWrapper(base);
}

export type Drawing = typeof App.prototype.drawing;

type Structure = {
  id: string;
  sequence: string;
  secondaryStructure?: { partnersNotation: PartnersNotation };
};

class DrawingWrapper {
  /**
   * The wrapped drawing.
   */
  readonly drawing: Drawing;

  constructor(drawing: Drawing) {
    this.drawing = drawing;
  }

  get lastSequence(): Sequence | undefined {
    let sequences = new ArrayWrapper(this.drawing.sequences);
    return sequences.lastItem;
  }

  appendStructure(structure: Structure) {
    this.drawing.appendStructure({
      id: structure.id,
      characters: structure.sequence,
      secondaryPartners: structure.secondaryStructure?.partnersNotation,
    });
  }

  drawTertiaryInteraction(spec: TertiaryInteractionSpec) {
    let drawing = new DrawTertiaryInteraction.DrawingWrapper(this.drawing);
    drawing.drawTertiaryInteraction(spec);
  }

  orientBaseNumberings() {
    orientBaseNumberings(this.drawing.drawing);
  }
}

export type LegacyDrawing = (
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

  get drawing() {
    return new DrawingWrapper(this.app.drawing);
  }

  /**
   * Throws if the legacy drawing is invalid.
   */
  openLegacyDrawing(drawing: LegacyDrawing): void | never {
    let { drawingFileContents } = drawing;

    let data = parseLegacyDrawing({ drawingFileContents });

    let sequenceString = data.sequence;

    if (!sequenceString) {
      throw new Error('Drawing is empty.');
    }

    this.drawing.appendStructure({
      id: data.sequenceId ?? 'Unnamed Structure',
      sequence: sequenceString,
      secondaryStructure: data.secondaryStructure,
    });

    let sequence = this.drawing.lastSequence;

    if (!sequence) {
      throw new Error('Invalid drawing file.'); // never supposed to happen
    }

    data.tertiaryInteractions?.forEach(spec => {
      if (spec && sequence) {
        this.drawing.drawTertiaryInteraction({
          ...spec,
          side1: { ...spec.side1, parentSequence: sequence },
          side2: { ...spec.side2, parentSequence: sequence },
        });
      }
    });

    let sequenceWrapper = new SequenceWrapper(sequence);

    if (data.sequenceNumbering) {
      sequenceWrapper.setNumbering(data.sequenceNumbering);
    }

    this.drawing.orientBaseNumberings();

    let bases = new ArrayWrapper(sequence.bases);

    // default to black
    let baseTextColors = data.baseTextColors?.map(color => (
      color ? color.toHex() : '#000000'
    ));

    baseTextColors?.forEach((color, i) => {
      bases.atIndex(i)?.text.attr('fill', color);
    });

    let baseWrappers = new ArrayWrapper(sequence.bases.map(wrapBase));

    // a base is not to be outlined if neither stroke nor fill are
    // specified
    data.baseOutlines?.forEach((spec, i) => {
      if (spec?.stroke || spec?.fill) {
        baseWrappers.atIndex(i)?.outline(spec);
      }
    });
  }
}
