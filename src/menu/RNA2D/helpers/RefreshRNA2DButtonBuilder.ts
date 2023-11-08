import type { Task } from 'Tasks/Task';

import { CallbackTask } from 'Tasks/CallbackTask';

import { CallbackCondition } from 'Conditions/CallbackCondition';

import { ConditionIsFalse as IsFalse } from 'Conditions/ConditionIsFalse';

import { ConditionalTask2 } from 'Tasks/ConditionalTask2';

export type BuildItems = {
  /**
   * Is expected to already have CSS styles to position it on screen in a fixed manner
   * when added to the document body for the app.
   */
  targetRNA2DButton: HTMLElement;

  targetApp: {
    drawing: {
      isEmpty(): boolean;
    }
  };

  theDocumentForTheApp: Document;
};

export class RefreshRNA2DButtonBuilder {
  /**
   * Builds a task that when performed will refresh the target RNA 2D menu button.
   */
  buildWith(items: BuildItems): Task {
    let showTheRNA2DButton = new CallbackTask(
      () => items.theDocumentForTheApp.body.appendChild(items.targetRNA2DButton)
    );

    let hideTheRNA2DButton = new CallbackTask(
      () => items.targetRNA2DButton.remove()
    );

    let userDoesNotHaveADrawingOpen = new CallbackCondition(() => items.targetApp.drawing.isEmpty());

    let userHasADrawingOpen = new IsFalse(userDoesNotHaveADrawingOpen);

    return new ConditionalTask2(showTheRNA2DButton, userHasADrawingOpen, hideTheRNA2DButton);
  }
}
