import { documentFontsAreReady } from './documentFontsAreReady';

test('documentFontsAreReady function', () => {
  // just a smoke test
  // (seems difficult to test fonts-related functionality on Node.js)
  expect(documentFontsAreReady()).toBe(false);
});
