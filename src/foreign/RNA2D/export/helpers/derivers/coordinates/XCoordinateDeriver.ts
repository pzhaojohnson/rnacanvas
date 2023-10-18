/**
 * At least has an X coordinate.
 */
export interface Point {
  x: number;
}

export interface PointDeriver<Something> {
  deriveFrom(something: Something): Point;
}

export class XCoordinateDeriver<Something> {
  _pointDeriver: PointDeriver<Something>;

  constructor(pointDeriver: PointDeriver<Something>) {
    this._pointDeriver = pointDeriver;
  }

  /**
   * Returns the X coordinate of the point derived by the helper
   * point deriver.
   */
  deriveFrom(something: Something): number {
    return this._pointDeriver.deriveFrom(something).x;
  }
}
