export class ReappendNodeToItsParent {
  constructor(private targetNode: Node) {}

  /**
   * Reappends the target node to its parent node.
   *
   * Does nothing if the target node has no parent node.
   */
  do(): void {
    let parent = this.targetNode.parentNode;

    if (parent) {
      parent.appendChild(this.targetNode);
    }
  }
}
