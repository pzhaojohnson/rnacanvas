import type { CircleBaseOutline } from './CircleBaseOutline';

export type RepositionMethodArgs = {
  baseCenter?: {
    x: number;
    y: number;
  };
};

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
  }

  reposition(args: RepositionMethodArgs) {
    let baseCenter = (
      args?.baseCenter
      ?? this.decoratee.cachedBaseCenter
    );

    if (!baseCenter) {
      return;
    }

    this.decoratee.circle.attr({
      'cx': baseCenter.x,
      'cy': baseCenter.y,
    });

    // cache the base center
    this.decoratee.cachedBaseCenter = baseCenter;
  }
}
