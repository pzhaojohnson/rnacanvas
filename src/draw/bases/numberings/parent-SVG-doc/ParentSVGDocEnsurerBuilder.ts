import { ParentSVGDocEnsurer } from './ParentSVGDocEnsurer';

import { ParentSVGDocDeterminer } from './ParentSVGDocDeterminer';

import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

export class ParentSVGDocEnsurerBuilder {
  build() {
    return new ParentSVGDocEnsurer<BaseNumbering>({
      parentSVGDocDeterminer: new ParentSVGDocDeterminer(),
    });
  }
}
