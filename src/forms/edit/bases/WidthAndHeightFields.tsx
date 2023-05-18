import type { App } from 'App';

import * as React from 'react';

import styles from './WidthAndHeightFields.css';

import { WidthField } from './WidthField';
import { HeightField } from './HeightField';

function Asterisk() {
  return (
    <span style={{ fontWeight: 900 }} >
      *
    </span>
  );
}

function ApplyToAllBasesNote() {
  return (
    <p className={styles.applyToAllBasesNote} >
      <Asterisk />
      &nbsp;Apply to all bases.
    </p>
  );
}

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;
};

export function WidthAndHeightFields(props: Props) {
  let widthField = (
    <WidthField
      app={props.app}
    />
  );

  let heightField = (
    <HeightField
      app={props.app}
    />
  );

  return (
    <div className={styles.widthAndHeightFields} >
      {widthField}
      {heightField}
      <ApplyToAllBasesNote />
    </div>
  );
}
