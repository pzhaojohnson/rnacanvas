import type { App } from 'App';

import * as React from 'react';

import { FormHistoryInterface } from 'Forms/history/FormHistoryInterface';

import { SelectBasesByTextContentForm } from './SelectBasesByTextContentForm';

import { SelectRequestHandler } from './helpers/SelectRequestHandler';

import { ByTextContentBasesGetter } from './helpers/ByTextContentBasesGetter';

import { AllBasesGetter } from './helpers/AllBasesGetter';

import { ByTextContentFilterer } from './helpers/ByTextContentFilterer';

import { TextContentGetter } from './helpers/TextContentGetter';

import { BasesSelector } from './helpers/BasesSelector';

import { SelectBasesByTextContentFormCloser } from './helpers/SelectBasesByTextContentFormCloser';

export type BuildForMethodArgs = {
  /**
   * The relevant app instance.
   */
  app: App;

  /**
   * A callback function to close the select-bases-by-text-content
   * form.
   */
  close: () => void;

  /**
   * An interface for going backward and forward between forms.
   */
  history: FormHistoryInterface;
};

export class SelectBasesByTextContentFormBuilder {
  buildFor(args: BuildForMethodArgs) {
    let { app } = args;

    let selectBasesByTextContentFormCloser = (
      new SelectBasesByTextContentFormCloser({
        closeCallback: args.close,
      })
    );

    return (
      <SelectBasesByTextContentForm
        close={args.close}
        history={args.history}
        selectRequestHandler={new SelectRequestHandler({
          byTextContentBasesGetter: new ByTextContentBasesGetter({
            allBasesGetter: new AllBasesGetter({
              drawing: app.drawing,
            }),
            byTextContentFilterer: new ByTextContentFilterer({
              textContentGetter: new TextContentGetter(),
            }),
          }),
          basesSelector: new BasesSelector({
            app,
            selectBasesByTextContentFormCloser,
          }),
        })}
      />
    );
  }
}
