export type Config = {
  targetNode: Node;
};

export class NodeIsTheLastChildOfItsParent {
  constructor(private config: Config) {}

  isTrue(): boolean {
    return this.config.targetNode === this.config.targetNode.parentNode?.lastChild;
  }
}
