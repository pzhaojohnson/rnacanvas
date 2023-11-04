export class AppendNodeToParent {
  constructor(private targetNode: Node, private parentNode: Node) {}

  /**
   * Appends the target node to the parent node provided at construction.
   */
  do(): void {
    this.parentNode.appendChild(this.targetNode);
  }
}
