/** @jsx h */

import { h } from 'dom-chef';

import styles from './Toolbar.css';

import type { App } from 'App';

import { GrabHatch } from './helpers/GrabHatch';

import { EditButton } from './helpers/EditButton';

import { ToolbarRepositioner } from './helpers/ToolbarRepositioner';

import { DragTranslaterBuilder } from 'Forms/drag/DragTranslaterBuilder';

import { FormUntranslaterBuilder as UntranslaterBuilder } from 'Forms/drag/FormUntranslaterBuilder';

import { CurrentToolIsTheEditingTool } from './helpers/CurrentToolIsTheEditingTool';

import { ThereAreElementsSelected } from './helpers/ThereAreElementsSelected';

import { CallbackTask } from 'Tasks/CallbackTask';

import { AllAreTrue } from 'Conditions/AllAreTrue';

class TheToolbarShouldBeShown {
  constructor(private config: { targetApp: App }) {}

  isTrue(): boolean {
    let targetApp = this.config.targetApp;

    let currentToolIsTheEditingTool = new CurrentToolIsTheEditingTool({ targetApp });

    let thereAreElementsSelected = new ThereAreElementsSelected({ targetApp });

    let condition = new AllAreTrue([
      currentToolIsTheEditingTool,
      thereAreElementsSelected,
    ]);

    return condition.isTrue();
  }
}

export type Props = {
  targetApp: App;
};

export function Toolbar(props: Props) {
  let { targetApp } = props;

  let toolbar = (
    <div className={styles.toolbar} >
      <GrabHatch />
      {EditButton({ targetApp })}
    </div>
  );

  let repositioner = <ToolbarRepositioner />;

  (new DragTranslaterBuilder()).buildFor(toolbar);

  (new UntranslaterBuilder()).buildUsing({
    targetForm: toolbar,
    untranslateButton: repositioner,
  });

  let showTheToolbarAndRepositioner = new CallbackTask(() => {
    document.body.append(toolbar);
    document.body.append(repositioner);
  });

  let hideTheToolbarAndRepositioner = new CallbackTask(() => {
    toolbar.remove();
    repositioner.remove();
  });

  let theToolbarShouldBeShown = new TheToolbarShouldBeShown({ targetApp });

  targetApp.refreshSignaller.addListener(() => {
    if (theToolbarShouldBeShown.isTrue()) {
      showTheToolbarAndRepositioner.do();
    } else {
      hideTheToolbarAndRepositioner.do();
    }
  });
}
