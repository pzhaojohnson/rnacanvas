import styles from './ExportButton.css';

export type BuildingBlocks = {
  /**
   * To be used to create elements.
   */
  document: Document;
};

export class ExportButtonFactory {
  /**
   * Creates an export button that can be used in an export-RNA-2D-schema form.
   */
  produceUsing(buildingBlocks: BuildingBlocks) {
    let exportButton = buildingBlocks.document.createElement('button');
    exportButton.classList.add(styles.exportButton);
    exportButton.textContent = 'Export';
    return exportButton;
  }
}
