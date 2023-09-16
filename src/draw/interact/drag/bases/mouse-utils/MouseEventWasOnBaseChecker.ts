export interface Base {
  text: {
    /**
     * The actual DOM node of the text element of the base.
     */
    node: {
      contains(node: Node): boolean;
    };
  }

  outline?: {
    circle?: {
      /**
       * The actual DOM node of the base outline circle element.
       */
      node: {
        contains(node: Node): boolean;
      };
    }
  }
}

export class MouseEventWasOnBaseChecker {
  /**
   * Returns true if the given mouse event was either on the text
   * of the base or the circle element of the outline of the base
   * (if the base has an outline).
   *
   * Returns false otherwise.
   */
  checkFor(args: { base: Base, mouseEvent: MouseEvent }): boolean {
    let b = args.base;
    let mouseEvent = args.mouseEvent;

    if (!(mouseEvent.target instanceof Node)) {
      return false;
    }

    let mouseEventWasOnText = b.text.node.contains(mouseEvent.target);

    let mouseEventWasOnOutline = (
      b.outline?.circle?.node.contains(mouseEvent.target) ?? false
    );

    return (
      mouseEventWasOnText
      || mouseEventWasOnOutline
    );
  }
}
