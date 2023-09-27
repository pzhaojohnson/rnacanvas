import type { App } from 'App';

import * as React from 'react';
import { ShowComplementsToggle } from './ShowComplementsToggle';
import { ComplementRulesButton } from './ComplementRulesButton';

export type Props = {

  // a reference to the whole app
  app: App;
};

export function BindingToolControls(props: Props) {
  let bindingTool = props.app.strictDrawingInteraction.bindingTool;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
      <div style={{ width: '4px' }} />
      <ShowComplementsToggle app={props.app} />
      {!bindingTool.showComplements ? null : (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <div style={{ width: '13px' }} />
          <ComplementRulesButton app={props.app} />
        </div>
      )}
    </div>
  );
}
