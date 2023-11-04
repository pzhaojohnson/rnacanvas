import { FormShowerHider2 } from './FormShowerHider2';

import { AppendNodeToParent } from './helpers/AppendNodeToParent';
import { RemoveNode } from './helpers/RemoveNode';

import { HideSignaller } from './HideSignaller';

import { AddCSSClassToNode } from './helpers/AddCSSClassToNode';
import { RemoveCSSClassFromNode } from './helpers/RemoveCSSClassFromNode';

import fadesInStyles from './helpers/fadesIn.css';

import { Tasks } from 'Tasks/Tasks';

import { DelayedTask } from 'Tasks/DelayedTask';

export type BuildingBlocks = {
  /**
   * Is expected to already have CSS styles that will properly position the form on screen
   * when appended to the document body.
   */
  targetForm: HTMLElement;

  /**
   * The target form will be removed from the document body when this button is clicked.
   */
  hideButton: HTMLElement;

  /**
   * The document body to append the target form to.
   */
  documentBody: InstanceType<typeof Document>['body'];
};

export class FormShowerHider2Builder {
  /**
   * Builds a form shower-hider.
   *
   * Built form shower-hiders will show the target form by appending it the provided document body.
   */
  buildUsing(buildingBlocks: BuildingBlocks): FormShowerHider2 {
    let appendTargetFormToTheDocumentBody = new AppendNodeToParent(
      buildingBlocks.targetForm,
      buildingBlocks.documentBody,
    );

    let removeTargetFormFromTheDocumentBody = new RemoveNode(buildingBlocks.targetForm);

    let addFadeInAnimationToTargetForm = new AddCSSClassToNode(
      buildingBlocks.targetForm,
      fadesInStyles.fadesIn,
    );

    let removeFadeInAnimationFromTargetForm = new RemoveCSSClassFromNode(
      buildingBlocks.targetForm,
      fadesInStyles.fadesIn,
    );

    // delay is hard-coded to match the duration of the fade in animation
    let removeFadeInAnimationFromTargetFormWhenItsDone = new DelayedTask(
      removeFadeInAnimationFromTargetForm,
      510,
    );

    let show = new Tasks([
      addFadeInAnimationToTargetForm,
      appendTargetFormToTheDocumentBody,
      removeFadeInAnimationFromTargetFormWhenItsDone,
    ]);

    let hide = removeTargetFormFromTheDocumentBody;

    let hideSignaller = new HideSignaller({ hideButton: buildingBlocks.hideButton });

    return new FormShowerHider2({ show, hide, hideSignaller });
  }
}
