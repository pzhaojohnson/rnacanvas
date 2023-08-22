import styles from './CloseButton.css';

export class CloseButtonFactory {
  /**
   * Returns a close button that can be used in an RNAcanvas
   * references dialog.
   */
  produce(): HTMLElement {
    let closeButton = document.createElement('button');
    closeButton.classList.add(styles.closeButton);
    closeButton.textContent = 'Close';
    return closeButton;
  }
}
