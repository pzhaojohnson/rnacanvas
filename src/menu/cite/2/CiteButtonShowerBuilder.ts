import { CiteButtonShower } from './CiteButtonShower';

import { CiteButtonFactory } from './helpers/CiteButtonFactory';

export class CiteButtonShowerBuilder {
  build(): CiteButtonShower {
    let positionedCiteButton = (new CiteButtonFactory()).producePositioned();

    positionedCiteButton.onclick = () => window.open('https://pubmed.ncbi.nlm.nih.gov/37094080/', '_blank');

    return new CiteButtonShower({
      positionedCiteButton,
    });
  }
}
