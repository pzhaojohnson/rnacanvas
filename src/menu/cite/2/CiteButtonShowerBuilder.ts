import type { App } from 'App';

import { CiteButtonShower } from './CiteButtonShower';

import { CiteButtonFactory } from './helpers/CiteButtonFactory';

import { RNAcanvasReferencesDialogShowerBuilder as CiteFormShowerBuilder } from 'Forms/cite/RNAcanvas-references-dialog/RNAcanvasReferencesDialogShowerBuilder';

export class CiteButtonShowerBuilder {
  buildWith(options: { targetApp: App }): CiteButtonShower {
    let { targetApp } = options;

    let positionedCiteButton = (new CiteButtonFactory()).producePositioned();

    positionedCiteButton.onclick = () => {
      if (targetApp.strictDrawing.isEmpty()) {
        window.open('https://pubmed.ncbi.nlm.nih.gov/37094080/', '_blank');
      } else {
        citeFormShower.show();
      }
    }

    return new CiteButtonShower({
      positionedCiteButton,
    });
  }
}

const citeFormShower = (new CiteFormShowerBuilder()).build();
