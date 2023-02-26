import type { CircleBaseOutline } from './CircleBaseOutline';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
  }

  addEventListener(
    ...args: (
      ['move', () => void]
      | ['remove', () => void]
    )
  ) {
    this.decoratee.eventListeners[args[0]].push(args[1]);
  }
}
