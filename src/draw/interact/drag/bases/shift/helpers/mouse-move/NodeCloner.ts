export class NodeCloner {
  /**
   * Deep clones the node by calling .cloneNode(true) on it.
   *
   * This method uses type casting to make the type of the returned
   * clone the same type as the provided node.
   *
   * (The .cloneNode method by default simply has a return type of
   * Node for all Node subtypes.)
   */
  deepClone<T extends Node>(node: T): T {
    return node.cloneNode(true) as T;
  }
}
