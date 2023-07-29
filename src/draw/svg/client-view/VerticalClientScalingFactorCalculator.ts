/**
 * An SVG element that is not an SVG document element.
 */
export interface AnSVGEleThatIsNotAnSVGDoc {
  /**
   * The actual DOM node of the SVG element.
   */
  node: {
    /**
     * Returns the bounding box of the untransformed SVG element in
     * the SVG coordinate system.
     */
    getBBox(): {
      height: number;
    }

    /**
     * Returns the bounding box of the SVG element in the client
     * coordinate system.
     */
    getBoundingClientRect(): {
      height: number;
    }
  }
}

export class VerticalClientScalingFactorCalculator {
  /**
   * Returns the scaling factor to convert the height of the SVG
   * element from the untransformed SVG coordinate system to the
   * client coordinate system.
   *
   * (The client coordinate system is the coordinate system for the
   * user's view of the app.)
   *
   * Will return a nonfinite number if the height of the SVG element
   * in the untransformed SVG coordinate system is zero.
   *
   * Does not seem to work properly with SVG document elements
   * themselves.
   */
  calculateFor(ele: AnSVGEleThatIsNotAnSVGDoc): number {
    let bbox = ele.node.getBBox();
    let clientBoundingRect = ele.node.getBoundingClientRect();

    return clientBoundingRect.height / bbox.height;
  }
}
