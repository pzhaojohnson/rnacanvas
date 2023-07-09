import type { App } from 'App';

import type { BaseNumbering } from 'Draw/bases/numberings/BaseNumbering';

import { TextPaddingField } from './TextPaddingField';

import { ValueToDisplayDeterminer } from './ValueToDisplayDeterminer';
import { RoundedTextPaddingsGetter } from './RoundedTextPaddingsGetter';
import { TextPaddingsGetter } from './TextPaddingsGetter';

import { ShouldSetDecider } from './ShouldSetDecider';
import { TextPaddingValueValidator } from './TextPaddingValueValidator';
import { DiffChecker } from './DiffChecker';

import { TextPaddingsSetter } from './TextPaddingsSetter';
import { UndoStackPusher } from 'Undo/UndoStackPusher';
import { AppRefresher } from 'Refresh/AppRefresher';

export type ConstructorArgs = {
  /**
   * The app instance that the base numberings belong to.
   */
  app: App;

  /**
   * The base numberings that the text padding field will be for.
   */
  baseNumberings: BaseNumbering[];
};

export class TextPaddingFieldBuilder {
  readonly _app: App;

  readonly _baseNumberings: BaseNumbering[];

  constructor(args: ConstructorArgs) {
    let { app, baseNumberings } = args;

    this._app = app;

    this._baseNumberings = baseNumberings;
  }

  build() {
    let app = this._app;
    let baseNumberings = this._baseNumberings;

    return new TextPaddingField({
      valueToDisplayDeterminer: new ValueToDisplayDeterminer({
        roundedTextPaddingsGetter: new RoundedTextPaddingsGetter({
          textPaddingsGetter: new TextPaddingsGetter({ baseNumberings }),
          places: 2,
        }),
      }),
      shouldSetDecider: new ShouldSetDecider({
        valueValidator: new TextPaddingValueValidator(),
        diffChecker: new DiffChecker({
          textPaddingsGetter: new TextPaddingsGetter({ baseNumberings }),
        }),
      }),
      textPaddingsSetter: new TextPaddingsSetter({
        baseNumberings,
        undoStackPusher: new UndoStackPusher({ app }),
        appRefresher: new AppRefresher({ app }),
      }),
    });
  }
}
