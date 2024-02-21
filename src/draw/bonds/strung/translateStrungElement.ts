import type { StrungElement } from 'Draw/bonds/strung/StrungElement';

import type { StraightBond } from 'Draw/bonds/straight/StraightBond';
import type { QuadraticBezierBond } from 'Draw/bonds/curved/QuadraticBezierBond';

import { curveOfBond } from 'Draw/bonds/strung/curveOfBond';
import { curveLengthOfBond } from 'Draw/bonds/strung/curveLengthOfBond';

import { directionOfBezierCurve } from 'Math/curves/directionOfBezierCurve';

import { magnitude2D as magnitude } from 'Math/points/magnitude';
import { direction } from '@rnacanvas/vectors';

import { repositionStrungElement } from 'Draw/bonds/strung/repositionStrungElement';

export type Bond = StraightBond | QuadraticBezierBond;

export type Args = {
  /**
   * The strung element to translate.
   */
  strungElement: StrungElement;

  /**
   * The bond containing the strung element.
   */
  parentBond: Bond;

  /**
   * X and Y translation components.
   *
   * These X and Y components are absolute and in reference to the
   * coordinate system of the drawing (i.e., not relative to the
   * direction of the curve of the parent bond).
   */
  x: number;
  y: number;
};

export function translateStrungElement(args: Args) {
  let { strungElement, parentBond, x, y } = args;

  let curve = curveOfBond(parentBond);
  let curveLength = curveLengthOfBond(parentBond);

  if (!curve) {
    console.error('Unable to determine the curve of the parent bond.');
    return;
  }

  let t = 0.5 + (strungElement.displacementFromCenter / curveLength);

  // constrain t to be between 0 and 1 inclusive
  if (!Number.isFinite(t)) {
    t = 0; // in case curve length is zero (or close to zero)
  } else if (t < 0) {
    t = 0;
  } else if (t > 1) {
    t = 1;
  }

  let curveDirectionY = directionOfBezierCurve(curve, t);
  let curveDirectionX = curveDirectionY + (Math.PI / 2);

  let translationMagnitude = magnitude({ x, y });
  let translationDirection = direction({ x, y });

  strungElement.displacementFromCurve.x += (
    translationMagnitude * Math.cos(translationDirection - curveDirectionX)
  );

  strungElement.displacementFromCurve.y += (
    translationMagnitude * Math.cos(translationDirection - curveDirectionY)
  );

  // reposition with the new displacement from curve
  repositionStrungElement(strungElement, { curve, curveLength });
}
