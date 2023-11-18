import styles from './CiteButton.css';

export class CiteButtonFactory {
  /**
   * Returns a cite button that already has CSS styles to position
   * it on screen in an absolute manner and on top of everything else
   * when added to the document body.
   */
  producePositioned(): HTMLElement {
    let citeButton = document.createElement('button');
    citeButton.classList.add(styles.positionedCiteButton);
    citeButton.textContent = 'Cite';
    return citeButton;
  }
}
