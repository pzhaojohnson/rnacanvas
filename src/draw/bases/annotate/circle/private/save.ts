import { CircleBaseOutline } from './CircleBaseOutline';

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

export class CircleBaseOutlineDecorator {
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
