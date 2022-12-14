import type { App } from 'App';

import * as React from 'react';
import { ToolOptionToggle } from 'Infobar/tools/ToolOptionToggle';

export type Props = {

  // a reference to the whole app
  app: App;
};

export function ShowComplementsToggle(props: Props) {
  let bindingTool = props.app.strictDrawingInteraction.bindingTool;

  return (
    <ToolOptionToggle
      isToggled={bindingTool.showComplements}
      onClick={() => {
        bindingTool.showComplements = !bindingTool.showComplements;
        props.app.refresh();
      }}
      style={{ width: '155px' }}
    >
      Show Complements
    </ToolOptionToggle>
  );
}
