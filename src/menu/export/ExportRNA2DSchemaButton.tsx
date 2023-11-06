import type { App } from 'App';

import { ExportRNA2DSchemaFormShowerBuilder } from 'Forms/export/RNA2D-schemas/ExportRNA2DSchemaFormShowerBuilder';

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
export function ExportRNA2DSchemaButton(props: Props) {
  let exportRNA2DSchemaFormShower = (new ExportRNA2DSchemaFormShowerBuilder()).buildUsing({
    app: props.app,
    document,
  });

  return (
    <DroppedButton
      text='RNA 2D JSON Schema'
      onClick={() => {
        exportRNA2DSchemaFormShower.show();
      }}
    />
  );
}
