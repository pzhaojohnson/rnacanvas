import styles from './RNA2DButton.css';

export type Resources = {
  /**
   * For creating elements.
   */
  document: Document;
};

export class RNA2DButtonFactory {
  /**
   * Returns an RNA 2D button for the top menu of the app.
   *
   * Produced RNA 2D buttons will already have CSS styles to position them on screen
   * in a fixed manner on top of everything else when added to the document body.
   */
  makeWith(resources: Resources): HTMLElement {
    let rna2DButton = resources.document.createElement('button');
    rna2DButton.classList.add(styles.rna2DButton);
    rna2DButton.textContent = 'RNA 2D';
    return rna2DButton;
  }
}
