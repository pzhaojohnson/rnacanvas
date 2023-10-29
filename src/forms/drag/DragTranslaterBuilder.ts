import { DragTranslater } from './DragTranslater';

import { DragSignaller } from './helpers/DragSignaller';

import { AllConditionsAreTrue as AllAreTrue } from 'Conditions/AllConditionsAreTrue';

import { LastMouseDownWasDirectlyOnNode } from './helpers/LastMouseDownWasDirectlyOnNode';

import { MouseIsCurrentlyDown } from 'Draw/interact/drag/bases/mouse-utils/MouseIsCurrentlyDown';

import { FormTranslater } from './helpers/FormTranslater';

import { CurrentTranslationMeasurer } from './helpers/CurrentTranslationMeasurer';

import { IsDraggableIndicator } from './helpers/IsDraggableIndicator';

import draggableFormStyles from './helpers/draggableForm.css';

class TargetNodeIsGrabbedBuilder {
  buildFor(targetNode: HTMLElement) {
    let lastMouseDownWasDirectlyOnNode = new LastMouseDownWasDirectlyOnNode({
      targetNode,
      theWindowForTheWholeApp: window,
    });

    let mouseIsCurrentlyDown = new MouseIsCurrentlyDown({ window });

    return new AllAreTrue([
      lastMouseDownWasDirectlyOnNode,
      mouseIsCurrentlyDown,
    ]);
  }
}

export class DragTranslaterBuilder {
  buildFor(targetForm: HTMLElement): DragTranslater {
    let targetFormIsGrabbed = (new TargetNodeIsGrabbedBuilder()).buildFor(targetForm);

    let dragSignaller = new DragSignaller({
      theWindowForTheWholeApp: window,
      targetNodeIsGrabbed: targetFormIsGrabbed,
    });

    let currentTranslationMeasurer = new CurrentTranslationMeasurer({ targetForm });

    let formTranslater = new FormTranslater({
      currentTranslationMeasurer,
      targetForm,
    });

    new IsDraggableIndicator({
      targetForm,
      draggableCSSClassName: draggableFormStyles.draggableForm,
    });

    return new DragTranslater({
      dragSignaller,
      formTranslater,
    });
  }
}
