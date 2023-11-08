import * as React from 'react';
import { Dropdown } from 'Menu/Dropdown';
import { DroppedSeparator } from 'Menu/DroppedSeparator';
import type { App } from 'App';
import { ExportSvgButton } from './ExportSvgButton';
import { ExportPptxButton } from './ExportPptxButton';
import { ExportLayoutStructureButton } from './ExportLayoutStructureButton';

export type Props = {
  app: App;
}

export function ExportDropdown(props: Props) {
  return (
    <Dropdown
      name='Export'
      dropped={
        <div style={{ width: '295px', display: 'flex', flexDirection: 'column' }} >
          <ExportSvgButton app={props.app} />
          <ExportPptxButton app={props.app} />
          <DroppedSeparator />
          <ExportLayoutStructureButton app={props.app} />
        </div>
      }
      disabled={props.app.strictDrawing.isEmpty()}
    />
  );
}
