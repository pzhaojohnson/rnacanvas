import * as SVG from '@svgdotjs/svg.js';

export interface AppendableBaseNumbering {
  /**
   * Appends the base numbering to the SVG document.
   *
   * Not expected to return anything.
   */
  appendTo(svgDoc: SVG.Svg): void | unknown;
}

export interface ParentSVGDocDeterminer<T> {
  /**
   * Returns the parent SVG document for the base numbering (if there
   * is one).
   *
   * Returns undefined otherwise.
   */
  determineFor(baseNumbering: T): SVG.Svg | undefined;
}

export type ConstructorArgs<T> = {
  parentSVGDocDeterminer: ParentSVGDocDeterminer<T>;
};

export class ParentSVGDocEnsurer<T extends AppendableBaseNumbering> {
  _parentSVGDocDeterminer: ParentSVGDocDeterminer<T>;

  constructor(args: ConstructorArgs<T>) {
    let { parentSVGDocDeterminer } = args;

    this._parentSVGDocDeterminer = parentSVGDocDeterminer;
  }

  /**
   * Ensures that the provided SVG document is the parent SVG document
   * for the provided base numbering.
   *
   * Does nothing if the SVG document is already the parent SVG
   * document for the base numbering.
   *
   * Appends the base numbering to the SVG document otherwise.
   */
  ensureFor(
    args: {
      baseNumbering: T,
      svgDoc: SVG.Svg,
    }
  ) {
    let { baseNumbering, svgDoc } = args;

    let parentSVGDocDeterminer = this._parentSVGDocDeterminer;
    let parentSVGDoc = parentSVGDocDeterminer.determineFor(baseNumbering);

    if (svgDoc != parentSVGDoc) {
      baseNumbering.appendTo(svgDoc);
    }
  }
}
