export interface ValueValidator {
  /**
   * Returns true if the given value would be a valid value for the
   * subject string value.
   *
   * Returns false otherwise.
   */
  isValid(value: string): boolean;
}

export interface DifferenceChecker {
  /**
   * Returns true if the given value is different from the subject
   * string value.
   *
   * Returns false otherwise.
   */
  checkFor(value: string): boolean;
}

export type ConstructorArgs = {
  valueValidator: ValueValidator;

  differenceChecker: DifferenceChecker;
};

/**
 * For deciding if the subject string value of a string input
 * component should be set to a value submitted by the user.
 */
export class ShouldSetDecider {
  readonly _valueValidator: ValueValidator;

  readonly _differenceChecker: DifferenceChecker;

  constructor(args: ConstructorArgs) {
    this._valueValidator = args.valueValidator;
    this._differenceChecker = args.differenceChecker;
  }

  /**
   * Returns true if the submitted value is valid and different from
   * what the subject string value currently is.
   *
   * Returns false otherwise.
   */
  shouldSetTo(submittedValue: string): boolean {
    return (
      this._valueValidator.isValid(submittedValue)
      && this._differenceChecker.checkFor(submittedValue)
    );
  }
}
