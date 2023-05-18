import type { App } from 'App';

import * as React from 'react';

import styles from './WidthAndHeightFields.css';

import { WidthField } from './WidthField';
import { HeightField } from './HeightField';

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
    </div>
  );
}
