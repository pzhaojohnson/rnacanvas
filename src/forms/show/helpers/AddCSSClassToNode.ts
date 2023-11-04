export interface StylizableNode {
  classList: {
    add(cssClassName: string): void;
  }
}

export class AddCSSClassToNode {
  constructor(private targetNode: StylizableNode, private cssClassName: string) {}

  /**
   * Adds the provided CSS class name to the CSS classes list of the target node.
   */
  do(): void {
    this.targetNode.classList.add(this.cssClassName);
  }
}
