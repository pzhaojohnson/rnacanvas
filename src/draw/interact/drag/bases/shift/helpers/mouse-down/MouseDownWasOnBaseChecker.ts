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

export class MouseDownWasOnBaseChecker {
  /**
   * Returns true if the given mouse down event was either on the
   * text of the base or the circle element of the outline of the
   * base (if the base has an outline).
   *
   * Returns false otherwise.
   */
  checkFor(args: { base: Base, mouseDown: MouseEvent }): boolean {
    let b = args.base;
    let mouseDown = args.mouseDown;

    if (!(mouseDown.target instanceof Node)) {
      return false;
    }

    let mouseDownWasOnText = b.text.node.contains(mouseDown.target);

    let mouseDownWasOnOutline = (
      b.outline?.circle?.node.contains(mouseDown.target) ?? false
    );

    return (
      mouseDownWasOnText
      || mouseDownWasOnOutline
    );
  }
}
