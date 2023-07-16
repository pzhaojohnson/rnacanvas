export type ConstructorArgs = {
  /**
   * A callback function that closes the select-bases-by-text-content
   * form when called.
   */
  closeCallback: () => void;
};

export class SelectBasesByTextContentFormCloser {
  readonly _closeCallback: () => void;

  constructor(args: ConstructorArgs) {
    let { closeCallback } = args;

    this._closeCallback = closeCallback;
  }

  /**
   * Closes the select-bases-by-text-content form.
   */
  close() {
    this._closeCallback();
  }
}
