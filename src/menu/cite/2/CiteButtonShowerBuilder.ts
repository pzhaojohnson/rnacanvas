import { CiteButtonShower } from './CiteButtonShower';

import { CiteButtonFactory } from './helpers/CiteButtonFactory';

import { CiteButtonClickHandler } from './helpers/CiteButtonClickHandler';

import { RNAcanvasReferencesDialogShowerBuilder as CiteFormShowerBuilder } from 'Cite/RNAcanvas-references-dialog/RNAcanvasReferencesDialogShowerBuilder';

export class CiteButtonShowerBuilder {
  build(): CiteButtonShower {
    let positionedCiteButton = (new CiteButtonFactory()).producePositioned();

    let citeFormShower = (new CiteFormShowerBuilder()).build();

    let citeButtonClickHandler = new CiteButtonClickHandler({
      citeButton: positionedCiteButton,
      citeFormShower,
    });

    return new CiteButtonShower({
      positionedCiteButton,
    });
  }
}
