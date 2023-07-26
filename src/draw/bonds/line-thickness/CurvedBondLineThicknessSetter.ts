/**
 * Has a path element.
 */
export interface CurvedBond {
  path: {
    /**
     * Can be used to set the stroke width of the path element to the
     * provided number value.
     */
    attr(name: 'stroke-width', value: number): void | unknown;
  }
}

export class CurvedBondLineThicknessSetter {
  /**
   * Sets the line thickness of the provided bond to the provided
   * line thickness.
   */
  set(
    args: {
      bond: CurvedBond,
      lineThickness: number,
    },
  ) {
    let { bond, lineThickness } = args;

    bond.path.attr('stroke-width', lineThickness);
  }
}
