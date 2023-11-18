import * as React from 'react';

import styles from './RNA2DSchemaOriginMessage.css';

function R2DTLink() {
  return (
    <a
      className={styles.r2dtLink}
      href='https://r2dt.bio/'
      target='_blank'
      rel='noreferrer noopener'
    >
      R2DT
    </a>
  );
}

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
      <div style={{ height: '7px' }} />
      <p className={styles.text} style={{ fontWeight: 700, color: 'black' }} >
        Not currently supported...
      </p>
      <div style={{ height: '34px' }} />
      <p className={styles.text} style={{ marginLeft: '19px' }} >
        ...for drawings based on an RNA 2D schema
      </p>
      <div style={{ height: '10px' }} />
      <p className={styles.text} style={{ marginLeft: '66px' }} >
        (e.g., come from <R2DTLink />)
      </p>
    </div>
  );
}
