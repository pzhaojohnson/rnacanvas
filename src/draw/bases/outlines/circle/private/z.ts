import type { CircleBaseOutline } from './CircleBaseOutline';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
  }

  sendToBack() {
    this.decoratee.circle.back();
  }

  bringToFront() {
    this.decoratee.circle.front();
  }
}
