import { pageIsFullyLoaded } from './pageIsFullyLoaded';

test('pageIsFullyLoaded function', () => {
  // just a smoke test
  // (seems difficult to test fonts-related functionality on Node.js)
  expect(pageIsFullyLoaded()).toBe(false);
});
