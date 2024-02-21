import { Point2D as Point } from 'Math/points/Point';
import { distance2D as distance } from 'Math/distance';
import { displacement } from '@rnacanvas/points';
import { direction } from '@rnacanvas/vectors';

export class NormalizedBaseCoordinates {
  _xLeft: number;
  _yTop: number;

  constructor(xLeft: number, yTop: number) {
    this._xLeft = xLeft;
    this._yTop = yTop;
  }

  get xLeft(): number {
    return this._xLeft;
  }

  get xRight(): number {
    return this.xLeft + 1;
  }

  get xCenter(): number {
    return this.xLeft + 0.5;
  }

  get yTop(): number {
    return this._yTop;
  }

  get yBottom(): number {
    return this.yTop + 1;
  }

  get yCenter(): number {
    return this.yTop + 0.5;
  }

  center(): Point {
    return { x: this.xCenter, y: this.yCenter };
  }

  distanceBetweenCenters(other: NormalizedBaseCoordinates): number {
    return distance(
      this.xCenter,
      this.yCenter,
      other.xCenter,
      other.yCenter
    );
  }

  angleBetweenCenters(other: NormalizedBaseCoordinates): number {
    return direction(displacement(this.center(), other.center()));
  }
}

export default NormalizedBaseCoordinates;
