export type AnObjectWithAGetterLikeMethod<N extends string, R> = {
  /**
   * A getter-like method that is called with no parameters.
   */
  [getterLikeMethodName in N]: () => R;
}

export class GettableDeriver<N extends string, R> {
  _getterLikeMethodName: N;

  constructor(getterLikeMethodName: N) {
    this._getterLikeMethodName = getterLikeMethodName;
  }

  /**
   * Returns the result of calling the getter-like method whose
   * name was passed to the constructor of this gettable deriver.
   */
  deriveFrom(anObject: AnObjectWithAGetterLikeMethod<N, R>): R {
    return anObject[this._getterLikeMethodName]();
  }
}
