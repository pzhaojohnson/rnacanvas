/**
 * Could be a path or a line.
 */
export interface SomeKindOfPathElement {
  /**
   * The actual DOM node of the path element.
   */
  node: {
    getPointAtLength(length: number): {
      y: number;
    }
  }
}

export class PathStartYDeriver {
  /**
   * Returns the Y coordinate of the starting point of the path.
   */
  deriveFrom(path: SomeKindOfPathElement): number {
    return path.node.getPointAtLength(0).y;
  }
}
