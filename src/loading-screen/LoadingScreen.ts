import styles from './LoadingScreen.css';

import { createLightPurplishBackground } from './private/createLightPurplishBackground';
import { createAppLogo } from './private/createAppLogo';

import { FadeOutOverlay } from './private/FadeOutOverlay';

import { isNullish } from 'Values/isNullish';

/**
 * A loading screen that covers the whole window when appended to the
 * document body.
 */
export class LoadingScreen {
  readonly node: ReturnType<typeof createLightPurplishBackground>;

  /**
   * Should be high enough to ensure that the loading screen is on top
   * of everything else.
   */
  zIndex = 1000;

  /**
   * The duration of the fade out animation when hiding the loading
   * screen.
   */
  hideAnimationDuration = 500;

  constructor() {
    this.node = createLightPurplishBackground();

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

  isBeingShown(): boolean {
    return !isNullish(this.node.parentNode);
  }

  /**
   * Hides the loading screen in a fade out animation.
   *
   * Returns a promise that resolves when the fade out animation
   * has finished.
   *
   * Does nothing if the loading screen is not currently being shown.
   *
   * The returned promise resolves immediately if the loading screen
   * is not currently being shown.
   */
  hide(): Promise<void> {
    if (!this.isBeingShown()) {
      return new Promise(resolve => resolve());
    }

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
   * An alias for the hide method.
   *
   * (The hide method already has the described behavior.)
   */
  hideIfBeingShown() {
    return this.hide();
  }
}
