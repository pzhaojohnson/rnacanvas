export type Config = {
  theWindowForTheWholeApp: {
    addEventListener(name: 'mousedown', listener: (event: MouseEvent) => void): void;
  };

  targetNode: HTMLElement;
};

export class LastMouseDownWasDirectlyOnNode {
  private _isTrue = false;

  constructor(config: Config) {
    config.theWindowForTheWholeApp.addEventListener('mousedown', event => {
      this._isTrue = event.target === config.targetNode;
    });
  }

  /**
   * Returns true if the most recent mouse down event was directly on
   * the target node (i.e., not on a child node of the target node).
   *
   * Returns false otherwise.
   */
  isTrue(): boolean {
    return this._isTrue;
  }
}
