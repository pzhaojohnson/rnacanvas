let returnValue = false;

let readyPromise: unknown = undefined;

// enclose any type cast
try {
  readyPromise = (document as any).fonts.ready;
} catch (error) {
  console.error(error);
  console.error('Unable to access document.fonts.ready property.');
}

if (readyPromise instanceof Promise) {
  readyPromise.then(() => returnValue = true);
} else {
  console.error('The document.fonts.ready property is not a promise.');
}

/**
 * Returns true once the document.fonts.ready promise is resolved.
 *
 * Note that if the document.fonts property is missing or if the
 * document.fonts.ready promise never resolves, then this function may
 * never return true.
 */
export function documentFontsAreReady(): boolean {
  return returnValue;
}
