import { NewAppTabOpener } from './NewAppTabOpener';

import { BaseAppURLProvider } from './BaseAppURLProvider';

import { SearchParamsRemover } from './SearchParamsRemover';

export class NewAppTabOpenerBuilder {
  build() {
    return new NewAppTabOpener({
      newTabOpener: window,
      baseAppURLProvider: new BaseAppURLProvider({
        fullAppURLKnower: document,
        searchParamsRemover: new SearchParamsRemover(),
      }),
    });
  }
}
