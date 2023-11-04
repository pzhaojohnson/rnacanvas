import { FormFronter2 } from './FormFronter2';

import { ReappendNodeToItsParent } from './helpers/ReappendNodetoItsParent';

import { NodeIsTheLastChildOfItsParent } from './helpers/NodeIsTheLastChildOfItsParent';

export class FormFronter2Builder {
  /**
   * Builds a form fronter for the target form.
   *
   * Adds event listeners for mouse down and focus events on the target form
   * that will bring the target form to the front.
   */
  buildFor(targetForm: HTMLElement): FormFronter2 {
    let bringToFront = new ReappendNodeToItsParent(targetForm);

    let nodeIsTheLastChildOfItsParent = new NodeIsTheLastChildOfItsParent({ targetNode: targetForm });

    let formFronter2 = new FormFronter2({
      bringToFront,
      isNotNecessary: nodeIsTheLastChildOfItsParent,
    });

    targetForm.addEventListener('mousedown', () => formFronter2.bringToFront());
    targetForm.addEventListener('focus', () => formFronter2.bringToFront());

    return formFronter2;
  }
}
