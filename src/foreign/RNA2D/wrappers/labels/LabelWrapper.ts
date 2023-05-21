import { NonNullObjectWrapper } from 'Values/NonNullObjectWrapper';

import { LabelContentWrapper } from './contents/LabelContentWrapper';

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
}
