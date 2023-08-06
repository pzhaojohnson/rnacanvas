import styles from './CloseButton.css';

/**
 * Produces close buttons to be included in on-open RNA 2D info
 * dialogs.
 */
export class CloseButtonFactory {
  produce(): HTMLElement {
    let closeButton = document.createElement('button');
    closeButton.classList.add(styles.closeButton);
    closeButton.textContent = 'Close';
    return closeButton;
  }
}
