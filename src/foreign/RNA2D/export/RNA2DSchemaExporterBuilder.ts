import { RNA2DSchemaExporter } from './RNA2DSchemaExporter';

import type { App } from 'App';

import { DrawingGetter } from './helpers/DrawingGetter';

import { Base as RNAcanvasBase } from 'Draw/bases/Base';

import { AllBasesInOrderFinder } from 'Draw/bases/AllBasesInOrderFinder';

import { RNA2DSchemaDeriver } from './helpers/derivers/schemas/RNA2DSchemaDeriver';

import { SerializedRNA2DSchemaDeriver } from './helpers/derivers/schemas/SerializedRNA2DSchemaDeriver';

import { ExportedRNA2DSchemaFileNameDeriver } from './helpers/ExportedRNA2DSchemaFileNameDeriver';

import { FileDownloader } from './helpers/FileDownloader';

import { offerFileForDownload } from 'Utilities/offerFileForDownload';

export class RNA2DSchemaExporterBuilder {
  /**
   * Builds an RNA 2D schema exporter for the provided app instance.
   */
  buildFor(app: App): RNA2DSchemaExporter {
    // simply gets the drawing of the app
    let targetRNAcanvasDrawingGetter = new DrawingGetter(app);

    let allRNAcanvasBasesInOrderFinder = new AllBasesInOrderFinder<RNAcanvasBase>();

    let rna2DSchemaDeriver = new RNA2DSchemaDeriver({
      targetRNAcanvasDrawingGetter,
      allRNAcanvasBasesInOrderFinder,
    });

    let serializedRNA2DSchemaDeriver = new SerializedRNA2DSchemaDeriver({
      rna2DSchemaDeriver,
      jsonStringifier: JSON,
    });

    let fileDownloader = new FileDownloader({ offerFileForDownload });

    let exportedFileNameDeriver = new ExportedRNA2DSchemaFileNameDeriver({
      theDocumentForTheWholeApp: document,
    });

    return new RNA2DSchemaExporter({
      serializedRNA2DSchemaDeriver,
      exportedFileNameDeriver,
      fileDownloader,
    });
  }
}
