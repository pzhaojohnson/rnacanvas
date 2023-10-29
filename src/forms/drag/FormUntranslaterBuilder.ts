import { FormUntranslater } from './FormUntranslater';

export type BuildingBlocks = {
  /**
   * The target form to build the form untranslater for.
   */
  targetForm: HTMLElement;

  /**
   * The target form is to be untranslated when this button is clicked.
   */
  untranslateButton: HTMLElement;
};

export class FormUntranslaterBuilder {
  buildUsing(buildingBlocks: BuildingBlocks): FormUntranslater {
    let formUntranslater = new FormUntranslater({ targetForm: buildingBlocks.targetForm });

    buildingBlocks.untranslateButton.addEventListener('click', () => formUntranslater.untranslate());

    return formUntranslater;
  }
}
