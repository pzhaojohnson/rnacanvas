import { BeforeLeavingHandler } from './BeforeLeavingHandler';

import { ShouldAskBeforeLeavingIndicator } from './ShouldAskBeforeLeavingIndicator';

import { NonEmptyDrawingIndicator } from './NonEmptyDrawingIndicator';

import { AskBeforeLeavingSettingIsToggledIndicator } from './AskBeforeLeavingSettingIsToggledIndicator';

import type { App } from 'App';

export class BeforeLeavingHandlerBuilder {
  buildFor(app: App): BeforeLeavingHandler {
    let requirementsIndicators = [
      new NonEmptyDrawingIndicator({ app }),
      new AskBeforeLeavingSettingIsToggledIndicator({ app }),
    ];

    let shouldAskBeforeLeavingIndicator = new ShouldAskBeforeLeavingIndicator({
      requirementsIndicators,
    });

    return new BeforeLeavingHandler({
      shouldAskBeforeLeaving: shouldAskBeforeLeavingIndicator,
      warningMessage: 'Are you sure?',
    });
  }
}
