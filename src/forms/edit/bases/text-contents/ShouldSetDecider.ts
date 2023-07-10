export interface TextContentValidator {
  /**
   * Returns true if the passed text content is valid text content for
   * a base and false otherwise.
   */
  isValid(textContent: string): boolean;
}

export type ConstructorArgs = {
  textContentValidator: TextContentValidator;
};

export class ShouldSetDecider {
  readonly _textContentValidator: TextContentValidator;

  constructor(args: ConstructorArgs) {
    let { textContentValidator } = args;

    this._textContentValidator = textContentValidator;
  }

  /**
   * The submitted value is expected to have come from user input
   * (such as through a field in a form).
   *
   * Given the value submitted by the user, returns true if the text
   * contents of the subject bases should be set to the submitted
   * value.
   *
   * Returns false otherwise.
   */
  shouldSetTo(submittedValue: string): boolean {
    return this._textContentValidator.isValid(submittedValue);
  }
}
