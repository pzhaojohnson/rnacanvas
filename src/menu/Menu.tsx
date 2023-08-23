import * as React from 'react';
import styles from './Menu.css';
import type { App } from 'App';
import { AppIcon } from './AppIcon';
import { FileDropdown } from './file/FileDropdown';
import { EditDropdown } from './edit/EditDropdown';
import { ExportDropdown } from './export/ExportDropdown';
import { AskBeforeLeavingToggle } from 'Menu/settings/AskBeforeLeavingToggle';

import { CiteButton } from './cite/CiteButton';

export type Props = {
  app: App;
}

export function Menu(props: Props) {
  let drawingIsEmpty = props.app.drawing.isEmpty();

  let askBeforeLeavingToggleContainer = !drawingIsEmpty ? (
    <div style={{ marginRight: '10px' }} >
      <AskBeforeLeavingToggle app={props.app} />
    </div>
  ) : null;

  let citeButtonSpacer = <div style={{ width: '24px' }} />;

  return (
    <div className={styles.menu} >
      <AppIcon app={props.app} />
      <FileDropdown app={props.app} />
      <EditDropdown app={props.app} />
      <ExportDropdown app={props.app} />
      <div style={{ flexGrow: 1 }} />
      <CiteButton />
      {citeButtonSpacer}
      {askBeforeLeavingToggleContainer}
    </div>
  );
}
