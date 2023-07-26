/**
 * Has a line element.
 */
export interface StraightBond {
  line: {
    /**
     * Can be used to set the stroke width of the line element to the
     * provided number value.
     *
     * Not expected to return anything.
     */
    attr(name: 'stroke-width', value: number): void | unknown;
  }
}

export class StraightBondLineThicknessSetter {
  /**
   * Sets the line thickness of the provided bond to the provided
   * line thickness.
   */
  set(
    args: {
      bond: StraightBond,
      lineThickness: number,
    },
  ) {
    let { bond, lineThickness } = args;

    bond.line.attr('stroke-width', lineThickness);
  }
}
