/**
 * Returns a promise that resolves after the given number of
 * milliseconds (or possibly a little bit longer).
 *
 * Uses the setTimeout function to keep track of the time.
 */
export function waitMilliseconds(milliseconds: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
