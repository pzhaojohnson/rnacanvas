export interface OptimalLineThicknessCalculator<Bond> {
  /**
   * Calculates an optimal line thickness for the bond.
   */
  calculateFor(bond: Bond): number;
}

export interface LineThicknessSetter<Bond> {
  /**
   * Sets the line thickness of the bond to the provided value.
   */
  set(args: { bond: Bond, lineThickness: number }): void;
}

export type ConstructorArgs<Bond> = {
  optimalLineThicknessCalculator: OptimalLineThicknessCalculator<Bond>;

  lineThicknessSetter: LineThicknessSetter<Bond>;
};

export class LineThicknessOptimizer<Bond> {
  readonly _optimalLineThicknessCalculator: (
    OptimalLineThicknessCalculator<Bond>
  );

  readonly _lineThicknessSetter: LineThicknessSetter<Bond>;

  constructor(args: ConstructorArgs<Bond>) {
    let { optimalLineThicknessCalculator, lineThicknessSetter } = args;

    this._optimalLineThicknessCalculator = optimalLineThicknessCalculator;
    this._lineThicknessSetter = lineThicknessSetter;
  }

  /**
   * Optimizes the line thickness of the bond.
   */
  applyTo(bond: Bond) {
    let calculator = this._optimalLineThicknessCalculator;
    let lineThickness = calculator.calculateFor(bond);

    this._lineThicknessSetter.set({ bond, lineThickness });
  }
}
