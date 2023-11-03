import { FormShowerHider as FormShower } from 'Forms/show/FormShowerHider'

import { DOMNodeFactory } from './helpers/DOMNodeFactory';

import { CloseButtonFactory } from './helpers/CloseButtonFactory';

import { HideSignaller } from 'Forms/show/HideSignaller';

import { ExportButtonFactory } from './helpers/ExportButtonFactory';

import { RNA2DSchemaExporterBuilder } from 'Foreign/RNA2D/export/RNA2DSchemaExporterBuilder';

import type { App } from 'App';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

import { FormUntranslaterBuilder } from 'Forms/drag/FormUntranslaterBuilder';

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
  buildUsing(buildingBlocks: BuildingBlocks): FormShower {
    let rna2DSchemaExporter = (new RNA2DSchemaExporterBuilder()).buildFor(buildingBlocks.app);

    let exportButton = (new ExportButtonFactory()).produceUsing({
      document: buildingBlocks.document,
    });

    exportButton.addEventListener('click', () => rna2DSchemaExporter.export());

    let closeButton = (new CloseButtonFactory()).produceUsing({
      document: buildingBlocks.document,
    });

    let hideSignaller = new HideSignaller({ hideButton: closeButton });

    let exportRNA2DSchemaForm = (new DOMNodeFactory()).produceUsing({
      document: buildingBlocks.document,
      exportButton,
      closeButton,
    });

    (new DragTranslaterBuilder()).buildFor(exportRNA2DSchemaForm);

    (new FormUntranslaterBuilder()).buildUsing({
      targetForm: exportRNA2DSchemaForm,
      untranslateButton: closeButton,
    });

    return new FormShower({
      documentBody: buildingBlocks.document.body,
      aFormWithFixedPositioning: exportRNA2DSchemaForm,
      hideSignaller,
    });
  }
}
