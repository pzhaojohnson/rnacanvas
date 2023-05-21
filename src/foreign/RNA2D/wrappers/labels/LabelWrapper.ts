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
}
