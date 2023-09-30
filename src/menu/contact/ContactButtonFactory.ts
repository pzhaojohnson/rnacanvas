import styles from './ContactButton.css';

export class ContactButtonFactory {
  /**
   * Returns a contact button that already has CSS styles to position
   * it on screen in an absolute manner and on top of everything else
   * when added to the document body.
   */
  producePositioned(): HTMLElement {
    let contactButton = document.createElement('button');
    contactButton.classList.add(styles.positionedContactButton);
    contactButton.textContent = 'Contact';
    return contactButton;
  }
}
