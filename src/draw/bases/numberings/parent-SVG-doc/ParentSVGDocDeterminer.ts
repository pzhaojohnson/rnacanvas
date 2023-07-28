import * as SVG from '@svgdotjs/svg.js';

/**
 * An SVG element.
 */
export interface SVGEle {
  /**
   * Returns the SVG document that the SVG element is in.
   *
   * Expected to return a nullish value if the SVG element is not
   * currently in an SVG document.
   */
  root(): SVG.Svg | null | undefined;
}

export interface BaseNumbering {
  text: SVGEle;

  line: SVGEle;
}

export class ParentSVGDocDeterminer {
  /**
   * Returns the SVG document containing the base numbering.
   *
   * Returns undefined if the base numbering has not been entirely
   * added to an SVG document.
   */
  determineFor(bn: BaseNumbering): SVG.Svg | undefined {
    let textParentSVGDoc = bn.text.root();
    let lineParentSVGDoc = bn.line.root();

    if (!textParentSVGDoc) {
      return undefined;
    } else if (!lineParentSVGDoc) {
      return undefined;
    } else if (textParentSVGDoc != lineParentSVGDoc) {
      return undefined;
    } else {
      return textParentSVGDoc;
    }
  }
}
