/**
 * Randomly picks one item from the array.
 *
 * Returns undefined if the array is empty.
 */
export function pickOneRandom<T>(array: T[]): T | undefined {
  if (array.length == 0) {
    return undefined;
  }

  let index = Math.floor(
    array.length * Math.random()
  );

  return array[index];
}
