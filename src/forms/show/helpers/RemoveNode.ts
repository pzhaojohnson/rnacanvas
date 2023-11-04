export interface RemovableNode {
  remove(): void;
}

export class RemoveNode {
  constructor(private targetNode: RemovableNode) {}

  /**
   * Removes the target node from whatever its parent is.
   */
  do() {
    this.targetNode.remove();
  }
}
