import { createLightPurplishBackground } from './createLightPurplishBackground';

test('createLightPurplishBackground function', () => {
  let background;

  expect(() => {
    background = createLightPurplishBackground();
    document.body.appendChild(background);
  }).not.toThrow();

  // has correct CSS styles
  expect(background.className).toBe('lightPurplishBackground');

  background.remove();
});
