import type { CircleBaseOutline } from './CircleBaseOutline';

import type { MoveEvent } from './CircleBaseOutline';
import type { RemoveEvent } from './CircleBaseOutline';

export class CircleBaseOutlineDecorator {
  decoratee: CircleBaseOutline;

  constructor(decoratee: CircleBaseOutline) {
    this.decoratee = decoratee;
  }

  addEventListener(
    ...args: (
      ['move', (event: MoveEvent) => void]
      | ['remove', (event: RemoveEvent) => void]
    )
  ) {
    this.decoratee.eventListeners[args[0]].push(args[1]);
  }
}
