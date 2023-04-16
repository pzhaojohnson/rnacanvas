import { createAppLogo } from './createAppLogo';

test('createAppLogo function', () => {
  let appLogo;

  expect(() => {
    appLogo = createAppLogo();
    document.body.appendChild(appLogo);
  }).not.toThrow();

  appLogo.remove();
});
