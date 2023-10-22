export type Config = {
  targetForm: HTMLElement;
}

/**
 * Brings a target form to the front of a user's view (i.e., on top
 * of other forms).
 */
export class FormFronter {
  constructor(private config: Config) {}

  /**
   * Simply reappends the target form to its parent node.
   *
   * Does nothing if the target form does not have a parent node.
   */
  bringToFront() {
    let parent = this.config.targetForm.parentNode;

    if (parent) {
      parent.appendChild(this.config.targetForm);
    }
  }
}
