import * as React from 'react';

import styles from './LatestUpdatesNotice.css';

function LatestUpdatesLink() {
  return (
    <a
      className={styles.latestUpdatesLink}
      href='https://github.com/pzhaojohnson/rnacanvas/releases'
      target='_blank'
      rel='noreferrer noopener'
    >
      Latest Updates
    </a>
  );
}

function LatestUpdatesDate() {
  return (
    <em className={styles.latestUpdatesDate} >
      (Dec. 2, 2023)
    </em>
  );
}

export function LatestUpdatesNotice() {
  return (
    <p className={styles.latestUpdatesNotice} >
      See the <LatestUpdatesLink />! <LatestUpdatesDate />
    </p>
  );
}
