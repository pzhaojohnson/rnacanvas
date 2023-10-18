/**
 * Could be a path or a line.
 */
export interface SomeKindOfPathSVGElement {
  /**
   * The actual DOM node of the path SVG element.
   */
  node: {
    getPointAtLength(length: number): {
      x: number;
    };
  }
}

export class PathStartXDeriver {
  /**
   * Derives the X coordinate of the starting point of the path.
   */
  deriveFrom(path: SomeKindOfPathSVGElement): number {
    return path.node.getPointAtLength(0).x;
  }
}
