export interface WindowObject {
  addEventListener(name: 'mouseover', listener: (event: MouseEvent) => void): void;
}

export interface MouseEventHandler {
  handle(event: MouseEvent): void;
}

export type DragOverToSelectBasesToolCtorParams = {
  /**
   * The window object for the whole app.
   */
  window: WindowObject;

  /**
   * Will be tasked with handling all mouse over events on the
   * window object.
   */
  mouseOverHandler: MouseEventHandler;
};

/**
 * Allows the user to select bases by clicking on a base and
 * dragging the mouse (with the mouse still down) over the other
 * bases that the user wishes to select.
 */
export class DragOverToSelectBasesTool {
  constructor(args: DragOverToSelectBasesToolCtorParams) {
    args.window.addEventListener('mouseover', event => {
      args.mouseOverHandler.handle(event);
    });
  }
}
