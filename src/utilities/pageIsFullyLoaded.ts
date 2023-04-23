import { documentFontsAreReady } from 'Utilities/documentFontsAreReady';

/**
 * Returns true if the web page has completely loaded, including all
 * resources such as images and fonts.
 *
 * Note that this function may never return true if certain web browser
 * functions don't work as expected.
 */
export function pageIsFullyLoaded(): boolean {
  return (
    document.readyState == 'complete'
    && documentFontsAreReady()
  );
}
