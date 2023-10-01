import * as React from 'react';
import styles from './Menu.css';
import type { App } from 'App';
import { AppIcon } from './AppIcon';
import { FileDropdown } from './file/FileDropdown';
import { EditDropdown } from './edit/EditDropdown';
import { ExportDropdown } from './export/ExportDropdown';

import { AskBeforeLeavingToggle } from 'Menu/settings/AskBeforeLeavingToggle';
import { AskBeforeLeavingTogglePlaceholder } from 'Menu/settings/AskBeforeLeavingTogglePlaceholder';

export type Props = {
  app: App;
}

export function Menu(props: Props) {
  let drawingIsEmpty = props.app.drawing.isEmpty();

  let askBeforeLeavingToggle = !drawingIsEmpty ? (
    <AskBeforeLeavingToggle app={props.app} />
  ) : (
    <AskBeforeLeavingTogglePlaceholder />
  );

  return (
    <div className={styles.menu} >
      <AppIcon app={props.app} />
      <FileDropdown app={props.app} />
      <EditDropdown app={props.app} />
      <ExportDropdown app={props.app} />
      <div style={{ flexGrow: 1 }} />
      {askBeforeLeavingToggle}
    </div>
  );
}
