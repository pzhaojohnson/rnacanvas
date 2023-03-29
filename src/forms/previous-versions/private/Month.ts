const fullNames: (string | undefined)[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export class Month {
  /**
   * Zero-based number of the month (0 through 11).
   */
  readonly index: number;

  constructor(args: { index: number }) {
    this.index = args.index;
  }

  /**
   * Returns undefined if the month index is invalid.
   */
  get fullName() {
    return fullNames[this.index];
  }
}
