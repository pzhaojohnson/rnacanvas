import * as SVG from '@svgdotjs/svg.js';

export interface BaseOutline {
  /**
   * The parent SVG document of the base outline.
   *
   * Is a nullish value if the base outline does not have a parent
   * SVG document.
   */
  readonly parent: SVG.Svg | null | undefined;

  /**
   * Appends the base outline to the SVG document.
   *
   * Not expected to return anything.
   */
  appendTo(svgDoc: SVG.Svg): void | unknown;
}

export class SVGDocContainsBaseOutlineEnsurer {
  /**
   * Ensures that the provided SVG document contains the provided
   * base outline.
   *
   * Does nothing if this is already so.
   *
   * Otherwise, appends the base outline to the SVG document.
   */
  ensureFor(
    args: {
      svgDoc: SVG.Svg,
      baseOutline: BaseOutline,
    },
  ) {
    let { svgDoc, baseOutline } = args;

    if (baseOutline.parent != svgDoc) {
      baseOutline.appendTo(svgDoc);
    }
  }
}
