import * as React from 'react';

import styles from './RNA2DSchemaOriginMessage.css';

/**
 * To be shown when the drawing of the app originates from an RNA 2D
 * schema.
 *
 * Indicates to the user that the add-subsequence form cannot
 * currently be used with such drawings.
 */
export function RNA2DSchemaOriginMessage() {
  return (
    <div>
      <p className={styles.text} >
        Adding subsequences not currently supported...
      </p>
      <div style={{ height: '33px' }} />
      <p className={styles.text} >
        Drawing originates from an RNA 2D schema...
      </p>
      <div style={{ height: '10px' }} />
      <p className={styles.text} style={{ marginLeft: '14px' }} >
        (e.g., comes from R2DT...)
      </p>
    </div>
  );
}
