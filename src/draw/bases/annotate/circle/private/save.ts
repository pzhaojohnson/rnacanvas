import { CircleBaseOutline } from './CircleBaseOutline';

import * as SVG from '@svgdotjs/svg.js';

/**
 * Includes legacy class name.
 */
export type ClassName = (
  'CircleBaseOutline'
  | 'CircleBaseAnnotation'
);

/**
 * The saved form of a circle base outline.
 *
 * Can be directly converted to JSON.
 */
export type SavedCircleBaseOutline = {
  className: ClassName;

  /**
   * Used to find the circle element within the parent SVG document.
   */
  circleId: string;
};

export type FromSavedStaticMethodParameters = {
  /**
   * Meant to be a saved circle base outline, but could be anything
   * since could be read from a file.
   */
  saved: SavedCircleBaseOutline | unknown;

  /**
   * The SVG document that the saved circle base outline is in.
   */
  parent: SVG.Svg;
};

export class CircleBaseOutlineDecorator {
  /**
   * Throws if the saved circle base outline is invalid.
   */
  static fromSaved
  (
    args: FromSavedStaticMethodParameters,
  ): CircleBaseOutline | never
  {
    let { saved, parent } = args;

    let circleId: string | unknown = undefined;
    let circle: SVG.Circle | unknown = undefined;

    try {
      circleId = (saved as any).circleId;
      circle = parent.findOne('#' + (circleId as any));
    } catch {}

    if (typeof circleId != 'string') {
      throw new Error('Missing circle ID.');
    } else if (!circleId) {
      throw new Error('Missing circle ID.');
    } else if (!(circle instanceof SVG.Circle)) {
      throw new Error('Unable to find circle element.');
    }

    return new CircleBaseOutline({ circle });
  }

  readonly decoratedCircleBaseOutline: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratedCircleBaseOutline = circleBaseOutline;
  }

  toSaved(): SavedCircleBaseOutline {
    return {
      className: 'CircleBaseOutline',
      circleId: this.decoratedCircleBaseOutline.circle.id(),
    };
  }
}
