export interface Base {
  text: {
    /**
     * The actual DOM node of the text element of the base.
     */
    node: EventTarget;
  }

  outline?: {
    circle?: {
      /**
       * The actual DOM node of a circle element of a base outline.
       */
      node: EventTarget;
    }
  }
}

export class MouseDownWasOnBaseChecker {
  /**
   * Returns true if the given mouse down event was either on the
   * text of the base or the circle element of the base outline (if
   * the base has an outline).
   *
   * Returns false otherwise.
   */
  checkFor(args: { base: Base, mouseDown: MouseEvent }): boolean {
    let b = args.base;
    let mouseDown = args.mouseDown;

    return (
      mouseDown.target === b.text.node
      || mouseDown.target === b.outline?.circle?.node
    );
  }
}
