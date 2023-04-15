import styles from './FadeOutOverlay.css';

export type ConstructorArgs = {
  style?: {
    /**
     * Controls the duration of the fade out animation.
     */
    animationDuration?: string;

    /**
     * The z-index of the fade out overlay.
     */
    zIndex?: string;
  };
};

/**
 * When appended to the document body, has the effect of causing the
 * whole window to fade to white in a fade out animation.
 *
 * (Z-index should be set to a high enough value to ensure that the
 * fade out overlay is on top of everything else in the document.)
 */
export class FadeOutOverlay {
  readonly node: HTMLDivElement;

  constructor(args?: ConstructorArgs) {
    this.node = document.createElement('div');
    this.node.className = styles.fadeOutOverlay;

    let defaultAnimationDuration = '500';

    this.node.style.animationDuration = (
      args?.style?.animationDuration ?? defaultAnimationDuration
    );

    let defaultZIndex = '10';

    this.node.style.zIndex = (
      args?.style?.zIndex ?? defaultZIndex
    );
  }

  /**
   * Appends the fade out overlay to the document body.
   */
  show() {
    document.body.appendChild(this.node);
  }

  /**
   * Removes the fade out overlay from the document.
   */
  hide() {
    this.node.remove();
  }
}
