import type { App } from 'App';

import { RNA2DSchemaExporterBuilder } from 'Foreign/RNA2D/export/RNA2DSchemaExporterBuilder';

import * as React from 'react';

import { DroppedButton } from 'Menu/DroppedButton';

export type Props = {
  /**
   * The app instance that the menu button will be for.
   */
  app: App;
}

/**
 * Offers for download an RNA 2D schema file to the user on click.
 */
export function ExportTemplateButton(props: Props) {
  let rna2DSchemaExporter = (new RNA2DSchemaExporterBuilder()).buildFor(props.app);

  return (
    <DroppedButton
      text='Template'
      onClick={() => {
        rna2DSchemaExporter.export();
      }}
    />
  );
}
