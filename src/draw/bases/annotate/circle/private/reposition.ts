import type { CircleBaseOutline } from './CircleBaseOutline';

export type RepositionMethodArgs = {
  baseCenter?: {
    x: number;
    y: number;
  };
};

export class CircleBaseOutlineDecorator {
  decoratedCircleBaseOutline: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratedCircleBaseOutline = circleBaseOutline;
  }

  reposition(args: RepositionMethodArgs) {
    let baseCenter = (
      args?.baseCenter
      ?? this.decoratedCircleBaseOutline.cachedBaseCenter
    );

    if (!baseCenter) {
      return;
    }

    this.decoratedCircleBaseOutline.circle.attr({
      'cx': baseCenter.x,
      'cy': baseCenter.y,
    });

    // cache the base center
    this.decoratedCircleBaseOutline.cachedBaseCenter = baseCenter;
  }
}
