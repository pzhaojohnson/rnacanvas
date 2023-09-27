import type { App } from 'App';

import * as React from 'react';
import { OnlyExpandToggle } from './OnlyExpandToggle';

export type Props = {
  app: App; // a reference to the whole app
};

export function DraggingToolControls(props: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} >
      <div style={{ width: '9px' }} />
      <OnlyExpandToggle {...props} />
    </div>
  );
}
