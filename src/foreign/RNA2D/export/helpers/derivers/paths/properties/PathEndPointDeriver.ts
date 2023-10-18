export interface Point {
  x: number;
  y: number;
}

/**
 * Could be a path or a line.
 */
export interface SomeKindOfPathElement {
  /**
   * The actual DOM node of the path element.
   */
  node: {
    getTotalLength(): number;

    getPointAtLength(length: number): Point;
  }
}

export class PathEndPointDeriver {
  /**
   * Returns the ending point of the path (i.e., the point at its
   * total length).
   */
  deriveFrom(path: SomeKindOfPathElement): Point {
    let totalLength = path.node.getTotalLength();

    return path.node.getPointAtLength(totalLength);
  }
}
