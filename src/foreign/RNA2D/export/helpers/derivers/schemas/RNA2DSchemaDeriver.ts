import type { App } from 'App';

import type { Base as RNAcanvasBase } from 'Draw/bases/Base';

export type RNAcanvasDrawing = InstanceType<typeof App>['drawing'];

export interface TargetRNAcanvasDrawingGetter {
  /**
   * Returns the target RNAcanvas drawing to derive an RNA 2D schema
   * from.
   */
  get(): RNAcanvasDrawing;
}

export interface AllRNAcanvasBasesInOrderFinder {
  /**
   * Returns all bases in the RNAcanvas drawing as they are ordered
   * in the RNAcanvas drawing (e.g., taking into account the
   * sequences in the drawing and the ordering of those sequences).
   */
  findIn(rnaCanvasDrawing: RNAcanvasDrawing): RNAcanvasBase[];
}

export type Helpers = {
  targetRNAcanvasDrawingGetter: TargetRNAcanvasDrawingGetter;

  allRNAcanvasBasesInOrderFinder: AllRNAcanvasBasesInOrderFinder;
};

export class RNA2DSchemaDeriver {
  _helpers: Helpers;

  constructor(helpers: Helpers) {
    this._helpers = helpers;
  }

  derive() {
    let targetRNAcanvasDrawing = this._helpers.targetRNAcanvasDrawingGetter.get();

    let allRNAcanvasBasesInOrder = this._helpers.allRNAcanvasBasesInOrderFinder.findIn(targetRNAcanvasDrawing);

    // don't export 5' and 3' labels as RNA 2D residues
    // (might cause issues outside of RNAcanvas with R2DT)
    allRNAcanvasBasesInOrder = allRNAcanvasBasesInOrder.filter(b => b.text.text() != "5'");
    allRNAcanvasBasesInOrder = allRNAcanvasBasesInOrder.filter(b => b.text.text() != "3'");

    let allRNA2DResidues = allRNAcanvasBasesInOrder.map((b, i) => ({
      residueIndex: i,
      residueName: b.text.text(),
      templateResidueName: b.text.text(),
      x: b.text.bbox().cx,
      y: b.text.bbox().cy,
    }));

    // currently RNA 2D base-pairs must be labeled "canonical"
    // (to not be ignored by R2DT)
    const basePairType = 'canonical';

    let allRNA2DBasePairs = targetRNAcanvasDrawing.secondaryBonds.map(sb => ({
      basePairType,
      residueIndex1: allRNAcanvasBasesInOrder.indexOf(sb.base1),
      residueIndex2: allRNAcanvasBasesInOrder.indexOf(sb.base2),
    }));

    return {
      rnaComplexes: [
        {
          rnaMolecules: [
            {
              sequence: allRNA2DResidues,
              basePairs: allRNA2DBasePairs,
            },
          ],
        },
      ],
    };
  }
}
