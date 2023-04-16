import styles from './LoadingScreen.css';

import { createWhiteBackground } from './private/createWhiteBackground';
import { createAppLogo } from './private/createAppLogo';

import { FadeOutOverlay } from './private/FadeOutOverlay';

/**
 * A loading screen that covers the whole window when appended to the
 * document body.
 */
export class LoadingScreen {
  readonly node: ReturnType<typeof createWhiteBackground>;

  /**
   * Should be high enough to ensure that the loading screen is on top
   * of everything else.
   */
  zIndex = 10;

  /**
   * The duration of the fade out animation when hiding the loading
   * screen.
   */
  hideAnimationDuration = 500;

  constructor() {
    this.node = createWhiteBackground();

    this.node.style.zIndex = this.zIndex.toString();

    let appLogo = createAppLogo();

    let appLogoContainer = document.createElement('div');
    appLogoContainer.className = styles.appLogoContainer;

    appLogoContainer.appendChild(appLogo);
    this.node.appendChild(appLogoContainer);

    // center the app logo
    this.node.style.display = 'flex';
    appLogoContainer.style.margin = 'auto';
  }

  /**
   * Appends the loading screen to the document body.
   */
  show() {
    document.body.appendChild(this.node);
  }

  /**
   * Hides the loading screen in a fade out animation.
   *
   * Returns a promise that resolves when the fade out animation
   * has finished.
   */
  hide() {
    let fadeOutOverlay = new FadeOutOverlay({
      style: {
        animationDuration: this.hideAnimationDuration + 'ms',
        zIndex: (this.zIndex + 1).toString(),
      },
    });

    fadeOutOverlay.show();

    // add 10 milliseconds
    // (to make sure that the fade out animation has finished)
    let delay = this.hideAnimationDuration + 10;

    return new Promise<void>(resolve => {
      setTimeout(() => {
        // might be best to remove the loading screen first
        this.node.remove();
        fadeOutOverlay.hide();

        resolve();
      }, delay);
    });
  }

  /**
   * Hides the loading screen once the page has fully loaded (or if the
   * page is already fully loaded).
   *
   * Returns a promise that resolves when the loading screen has been
   * hidden.
   */
  hideOncePageHasFullyLoaded() {
    // check every 50 milliseconds
    let delay = 50;

    return new Promise<void>(resolve => {
      let intervalId = setInterval(() => {
        if (document.readyState == 'complete') {
          clearInterval(intervalId);
          this.hide().then(() => resolve());
        }
      }, delay);
    });
  }
}
