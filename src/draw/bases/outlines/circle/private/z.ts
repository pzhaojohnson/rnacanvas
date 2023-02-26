import type { CircleBaseOutline } from './CircleBaseOutline';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratee = circleBaseOutline;
  }

  sendToBack() {
    this.decoratee.circle.back();
  }

  bringToFront() {
    this.decoratee.circle.front();
  }
}
