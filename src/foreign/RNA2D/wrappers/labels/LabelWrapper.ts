import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { LabelContentWrapper } from './contents/LabelContentWrapper';

import { LabelLineWrapper } from './lines/LabelLineWrapper';

export class LabelWrapper {
  wrappee: unknown;

  constructor(wrappee: unknown) {
    this.wrappee = wrappee;
  }

  get labelContent() {
    let labelContent = (new NonNullObjectWrapper(this.wrappee))
      .getProperty('labelContent');

    return new LabelContentWrapper(labelContent);
  }

  get labelLine() {
    let labelLine = (new NonNullObjectWrapper(this.wrappee))
      .getProperty('labelLine');

    return new LabelLineWrapper(labelLine);
  }

  get residueIndex() {
    return (new NonNullObjectWrapper(this.wrappee))
      .getFiniteNumberProperty('residueIndex');
  }

  isNumbering() {
    let contentLabel = this.labelContent.label;

    return (
      typeof contentLabel == 'string'
      && Number.isFinite(Number.parseFloat(contentLabel))
    );
  }
}
