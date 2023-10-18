/**
 * At least has a Y coordinate.
 */
export interface Point {
  y: number;
}

export interface PointDeriver<Something> {
  deriveFrom(something: Something): Point;
}

export class YCoordinateDeriver<Something> {
  _pointDeriver: PointDeriver<Something>;

  constructor(pointDeriver: PointDeriver<Something>) {
    this._pointDeriver = pointDeriver;
  }

  /**
   * Returns the Y coordinate of the point derived by the helper
   * point deriver.
   */
  deriveFrom(something: Something): number {
    return this._pointDeriver.deriveFrom(something).y;
  }
}
