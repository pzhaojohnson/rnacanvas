import type { CircleBaseOutline } from './CircleBaseOutline';

export class CircleBaseOutlineDecorator {
  decoratedCircleBaseOutline: CircleBaseOutline;

  constructor(circleBaseOutline: CircleBaseOutline) {
    this.decoratedCircleBaseOutline = circleBaseOutline;
  }

  sendToBack() {
    this.decoratedCircleBaseOutline.circle.back();
  }

  bringToFront() {
    this.decoratedCircleBaseOutline.circle.front();
  }
}
