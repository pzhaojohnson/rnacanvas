import styles from './CloseButton.css';

export type BuildingBlocks = {
  /**
   * To be used to create elements.
   */
  document: Document;
};

export class CloseButtonFactory {
  /**
   * Returns a close button for an export-RNA-2D-schema form.
   */
  produceUsing(buildingBlocks: BuildingBlocks) {
    let closeButton = buildingBlocks.document.createElement('button');
    closeButton.classList.add(styles.closeButton);
    closeButton.textContent = 'Close';
    return closeButton;
  }
}
