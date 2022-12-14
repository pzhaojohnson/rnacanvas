// a compare function that can be used when sorting numbers
export function compareNumbersAscending(a: number, b: number): number {
  return a - b;
}

export { compareNumbersAscending as compareNumbers };

export function compareNumbersDescending(a: number, b: number): number {
  return -1 * compareNumbersAscending(a, b);
}

// a compare function that can be used when sorting strings
export function compareStringsAscending(a: string, b: string): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

export { compareStringsAscending as compareStrings };

export function compareStringsDescending(a: string, b: string): number {
  return -1 * compareStringsAscending(a, b);
}
