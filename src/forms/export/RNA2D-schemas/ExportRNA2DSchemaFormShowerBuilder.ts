import { FormShowerHider2Builder as FormShowerBuilder } from 'Forms/show/FormShowerHider2Builder';

import { DOMNodeFactory } from './helpers/DOMNodeFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { ExportButtonFactory } from './helpers/ExportButtonFactory';

import { RNA2DSchemaExporterBuilder } from 'Foreign/RNA2D/export/RNA2DSchemaExporterBuilder';

import type { App } from 'App';

export type BuildingBlocks = {
  /**
   * An app instance that shown export-RNA-2D-schema forms will be for.
   */
  app: App;

  /**
   * To be used to create elements.
   */
  document: Document;
};

export class ExportRNA2DSchemaFormShowerBuilder {
  buildUsing(buildingBlocks: BuildingBlocks) {
    let rna2DSchemaExporter = (new RNA2DSchemaExporterBuilder()).buildFor(buildingBlocks.app);

    let exportButton = (new ExportButtonFactory()).produceUsing({
      document: buildingBlocks.document,
    });

    exportButton.addEventListener('click', () => rna2DSchemaExporter.export());

    let closeButton = (new CloseButtonFactory()).produceUsing({
      document: buildingBlocks.document,
    });

    let exportRNA2DSchemaForm = (new DOMNodeFactory()).produceUsing({
      document: buildingBlocks.document,
      exportButton,
      closeButton,
    });

    return (new FormShowerBuilder()).buildUsing({
      targetForm: exportRNA2DSchemaForm,
      hideButton: closeButton,
      documentBody: buildingBlocks.document.body,
    });
  }
}
