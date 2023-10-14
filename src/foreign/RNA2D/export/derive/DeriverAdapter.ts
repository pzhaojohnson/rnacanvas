export type DeriverLike<N extends string, P extends unknown[], R> = {
  /**
   * A method that derives a value from other value(s).
   */
  [methodName in N]: (...params: P) => R;
};

/**
 * Adapts an object that will serve as a deriver to the standard
 * deriver interface (i.e., with a `deriveFrom` method).
 */
export class DeriverAdapter<N extends string, P extends unknown[], R> {
  _objectToAdapt: DeriverLike<N, P, R>;

  _objectMethodName: N;

  constructor(objectToAdapt: DeriverLike<N, P, R>, objectMethodName: N) {
    this._objectToAdapt = objectToAdapt;

    this._objectMethodName = objectMethodName;
  }

  deriveFrom(...params: P): R {
    return this._objectToAdapt[this._objectMethodName](...params);
  }
}
