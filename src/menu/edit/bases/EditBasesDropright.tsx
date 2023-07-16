import * as React from 'react';
import styles from './EditBasesDropright.css';
import { Dropright } from 'Menu/Dropright';
import { DroppedSeparator } from 'Menu/DroppedSeparator';
import type { App } from 'App';
import { BySelectionButton } from './BySelectionButton';
import { ByTextButton } from './ByTextButton';
import { ByDataButton } from './ByDataButton';
import { CapitalizeButton } from './CapitalizeButton';
import { DecapitalizeButton } from './DecapitalizeButton';
import { TsToUsButton } from './TsToUsButton';
import { UsToTsButton } from './UsToTsButton';

export type Props = {
  app: App;
}

export function EditBasesDropright(props: Props) {
  return (
    <Dropright
      name='Bases'
      dropped={
        <div style={{ width: '298px', display: 'flex', flexDirection: 'column' }} >
          <div className={styles.topContainer} >
            <BySelectionButton app={props.app} />
          </div>
          <div className={styles.bottomContainer} >
            <DroppedSeparator />
            <ByTextButton app={props.app} />
            <ByDataButton app={props.app} />
            <DroppedSeparator />
            <CapitalizeButton app={props.app} />
            <DecapitalizeButton app={props.app} />
            <DroppedSeparator />
            <TsToUsButton app={props.app} />
            <UsToTsButton app={props.app} />
          </div>
        </div>
      }
    />
  );
}
