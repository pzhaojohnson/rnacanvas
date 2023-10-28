export interface MouseEventListener {
  (event: MouseEvent): void;
}

export type DragEventListener = MouseEventListener;

export interface Config {
  theWindowForTheWholeApp: {
    addEventListener(name: 'mousemove', listener: MouseEventListener): void;
  }

  /**
   * A condition.
   */
  targetNodeIsGrabbed: {
    /**
     * Should return true if the user has clicked down on the target node
     * and the target node will be dragged when the mouse is moved.
     *
     * Should return false otherwise.
     */
    isTrue(): boolean;
  }
}

export class DragSignaller {
  private listeners: DragEventListener[];

  constructor(private config: Config) {
    this.listeners = [];

    config.theWindowForTheWholeApp.addEventListener('mousemove', event => {
      if (config.targetNodeIsGrabbed.isTrue()) {
        this.listeners.forEach(listener => listener(event));
      }
    });
  }

  addListener(listener: DragEventListener): void {
    this.listeners.push(listener);
  }
}
