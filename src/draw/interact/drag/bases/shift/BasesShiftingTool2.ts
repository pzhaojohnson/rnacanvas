export interface WindowObject {
  addEventListener(name: 'mousemove' | 'mouseup', listener: (event: MouseEvent) => void): void;
}

export interface MouseEventHandler {
  handle(mouseEvent: MouseEvent): void;
}

export type BasesShiftingTool2CtorParams = {
  /**
   * The window object for the whole app.
   */
  window: WindowObject;

  /**
   * Will be tasked with handling mouse move events on the window
   * object for the whole app.
   */
  mouseMoveHandler: MouseEventHandler;

  /**
   * Will be tasked with handling mouse up events on the window
   * object for the whole app.
   */
  mouseUpHandler: MouseEventHandler;
};

/**
 * Allows bases to be shifted when being dragged by the mouse.
 */
export class BasesShiftingTool2 {
  constructor(args: BasesShiftingTool2CtorParams) {
    args.window.addEventListener('mousemove', event => {
      args.mouseMoveHandler.handle(event);
    });

    args.window.addEventListener('mouseup', event => {
      args.mouseUpHandler.handle(event);
    });
  }
}
