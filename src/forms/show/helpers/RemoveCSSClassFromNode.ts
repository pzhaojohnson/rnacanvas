export interface StylizableNode {
  classList: {
    remove(cssClassName: string): void;
  }
}

export class RemoveCSSClassFromNode {
  constructor(private targetNode: StylizableNode, private cssClassName: string) {}

  /**
   * Removes the CSS class name from the CSS classes list of the target node.
   */
  do(): void {
    this.targetNode.classList.remove(this.cssClassName);
  }
}
