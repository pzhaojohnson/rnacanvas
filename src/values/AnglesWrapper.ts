import { normalizeAngle } from 'Math/angles/normalizeAngle';

import { NumbersWrapper } from 'Values/NumbersWrapper';

import { isNullish } from '@rnacanvas/value-check';

export type Nullish = null | undefined;

export type NormalizeOptions = {
  /**
   * The minimum angle to normalize angles above.
   *
   * (Angles will be normalized such that they are greater than or equal
   * to the angle floor and less than 2 * Math.PI above the angle
   * floor.)
   *
   * Defaults to zero if left unspecified.
   */
  angleFloor?: number;
};

export type RoundOptions = {
  /**
   * The number of decimal places to round to.
   *
   * Defaults to zero.
   */
  places?: number;
};

/**
 * Works with angles in radians.
 */
export class AnglesWrapper {
  /**
   * The wrapped angles.
   */
  angles: (number | Nullish)[];

  constructor(angles: (number | Nullish)[]) {
    this.angles = angles;
  }

  /**
   * Returns a new angles wrapper of the normalized angles.
   */
  normalize(options?: NormalizeOptions): AnglesWrapper {
    let angleFloor = options?.angleFloor ?? 0;

    return new AnglesWrapper(
      this.angles.map(angle => {
        if (isNullish(angle)) {
          return angle;
        } else {
          return normalizeAngle(angle, angleFloor);
        }
      })
    );
  }

  /**
   * Returns a new angles wrapper of the rounded angles.
   */
  round(options?: RoundOptions): AnglesWrapper {
    let angles = new NumbersWrapper(this.angles);

    let places = options?.places ?? 0;
    angles = angles.round(places);

    return new AnglesWrapper(angles.values);
  }

  /**
   * Returns a nullish value if not all angles are the same
   * or if the angles array contains a nullish value.
   */
  get commonValue(): number | Nullish {
    let angles = new NumbersWrapper(this.angles);
    return angles.commonValue;
  }
}
