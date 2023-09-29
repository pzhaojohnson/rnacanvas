import styles from './CloseButton.css';

export class CloseButtonFactory {
  /**
   * Returns a close button that can be used in a contact form.
   */
  produce(): HTMLElement {
    let closeButton = document.createElement('button');
    closeButton.classList.add(styles.closeButton);
    closeButton.textContent = 'Close';
    return closeButton;
  }
}
