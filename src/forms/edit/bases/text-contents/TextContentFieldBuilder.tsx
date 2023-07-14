import type { App } from 'App';

import type { Base } from 'Draw/bases/Base';

import * as React from 'react';

import { StringInputField } from 'Forms/edit/strings/StringInputField';

import { StringInput } from 'Forms/edit/strings/StringInput';

import { ValueToDisplayProvider } from './ValueToDisplayProvider';
import { TextContentsGetter } from './TextContentsGetter';

import { SubmittedValueRefiner } from './SubmittedValueRefiner';

import { ShouldSetDecider } from 'Forms/edit/strings/helpers/ShouldSetDecider';
import { TextContentValidator } from './TextContentValidator';
import { DiffChecker } from './DiffChecker';

import { TextContentsSetter } from './TextContentsSetter';
import { SingleTextContentSetter } from './SingleTextContentSetter';
import { UndoStackPusher } from 'Undo/UndoStackPusher';
import { AppRefresher } from 'Refresh/AppRefresher';

export type ConstructorArgs = {
  /**
   * The relevant app instance.
   */
  app: App;

  /**
   * The bases that the text content field when built will control the
   * text contents of.
   */
  bases: Base[];
};

export class TextContentFieldBuilder {
  readonly _app: App;
  readonly _bases: Base[];

  constructor(args: ConstructorArgs) {
    let { app, bases } = args;

    this._app = app;
    this._bases = bases;
  }

  build() {
    let app = this._app;
    let bases = this._bases;

    return (
      <StringInputField
        label='Text'
        stringInput={
          <StringInput
            initialValueProvider={new ValueToDisplayProvider({
              textContentsGetter: new TextContentsGetter({ bases }),
            })}
            submittedValueRefiner={new SubmittedValueRefiner()}
            shouldSetDecider={new ShouldSetDecider({
              valueValidator: new TextContentValidator(),
              differenceChecker: new DiffChecker({
                textContentsGetter: new TextContentsGetter({ bases }),
              }),
            })}
            setter={new TextContentsSetter({
              bases,
              singleTextContentSetter: new SingleTextContentSetter(),
              undoStackPusher: new UndoStackPusher({ app }),
              appRefresher: new AppRefresher({ app }),
            })}
          />
        }
        style={{
          marginBottom: '8px',
          alignSelf: 'start',
        }}
      />
    );
  }
}
