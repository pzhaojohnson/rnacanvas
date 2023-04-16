import { createWhiteBackground } from './createWhiteBackground';

test('createWhiteBackground function', () => {
  let whiteBackground;

  expect(() => {
    whiteBackground = createWhiteBackground();
    document.body.appendChild(whiteBackground);
  }).not.toThrow();

  // has correct CSS styles
  expect(whiteBackground.className).toBe('whiteBackground');

  whiteBackground.remove();
});
