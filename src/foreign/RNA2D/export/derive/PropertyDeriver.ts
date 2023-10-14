export type AnObjectWithASpecificProperty<N extends string, V> = {
  [propertyName in N]: V;
};

export class PropertyDeriver<N extends string, V> {
  _propertyName: N;

  constructor(propertyName: N) {
    this._propertyName = propertyName;
  }

  /**
   * Returns the value of the property whose name was passed to the
   * constructor of this property deriver.
   */
  deriveFrom(anObject: AnObjectWithASpecificProperty<N, V>): V {
    return anObject[this._propertyName];
  }
}
