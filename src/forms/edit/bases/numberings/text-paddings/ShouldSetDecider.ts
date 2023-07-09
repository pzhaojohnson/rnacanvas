export interface ValueValidator {
  /**
   * Returns true if the value is a valid text padding value and false
   * otherwise.
   */
  isValid(value: number): boolean;
}

export interface DiffChecker {
  /**
   * Returns true if the given value is different from at least one of
   * the current text padding values.
   */
  someTextPaddingsDifferFrom(value: number): boolean;
}

export type ConstructorArgs = {
  valueValidator: ValueValidator;

  diffChecker: DiffChecker;
};

export class ShouldSetDecider {
  readonly _valueValidator: ValueValidator;

  readonly _diffChecker: DiffChecker;

  constructor(args: ConstructorArgs) {
    let { valueValidator, diffChecker } = args;

    this._valueValidator = valueValidator;

    this._diffChecker = diffChecker;
  }

  /**
   * Returns true if a text padding field or input element should set
   * the text paddings of the subject base numberings to a given
   * submitted value.
   *
   * Returns false otherwise.
   */
  shouldSetTo(value: number): boolean {
    let isValid = this._valueValidator.isValid(value);

    let someTextPaddingsDiffer = (
      this._diffChecker.someTextPaddingsDifferFrom(value)
    );

    return isValid && someTextPaddingsDiffer;
  }
}
