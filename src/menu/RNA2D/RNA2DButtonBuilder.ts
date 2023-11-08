import type { App } from 'App';

import { RNA2DButtonFactory } from './helpers/RNA2DButtonFactory';

import { ExportRNA2DSchemaFormShowerBuilder } from 'Forms/export/RNA2D-schemas/ExportRNA2DSchemaFormShowerBuilder';

import { RefreshRNA2DButtonBuilder } from './helpers/RefreshRNA2DButtonBuilder';

export type BuildItems = {
  targetApp: App;

  theDocumentForTheApp: Document;
};

export class RNA2DButtonBuilder {
  /**
   * Builds an RNA 2D button for the top menu of the app that when clicked on
   * will open a form for exporting RNA 2D schemas.
   *
   * Built RNA 2D buttons will listen to the refresh signaller of the app
   * and will refresh themselves on their own.
   */
  buildWith(items: BuildItems) {
    let rna2DButton = (new RNA2DButtonFactory()).makeWith({ document: items.theDocumentForTheApp });

    let exportRNA2DSchemaFormShower = (new ExportRNA2DSchemaFormShowerBuilder()).buildUsing({
      app: items.targetApp,
      document: items.theDocumentForTheApp,
    });

    rna2DButton.addEventListener('click', () => exportRNA2DSchemaFormShower.show());

    let refreshRNA2DButton = (new RefreshRNA2DButtonBuilder()).buildWith({
      targetRNA2DButton: rna2DButton,
      targetApp: items.targetApp,
      theDocumentForTheApp: items.theDocumentForTheApp,
    });

    items.targetApp.refreshSignaller.addListener(() => refreshRNA2DButton.do());

    // to initialize the RNA 2D button
    refreshRNA2DButton.do();

    return rna2DButton;
  }
}
