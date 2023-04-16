import { createWhiteBackground } from './private/createWhiteBackground';
import { createAppLogo } from './private/createAppLogo';

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

  constructor() {
    this.node = createWhiteBackground();

    this.node.style.zIndex = this.zIndex.toString();

    let appLogo = createAppLogo();
    this.node.appendChild(appLogo);

    // center the app logo
    this.node.style.display = 'flex';
    appLogo.style.margin = 'auto';
  }

  /**
   * Appends the loading screen to the document body.
   */
  show() {
    document.body.appendChild(this.node);
  }
}
