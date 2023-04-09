import * as React from 'react';

import styles from './Header.css';

export type Props = {};

export function Header(props: Props) {
  let title = (
    <p className={styles.title} >
      Previous Versions of&nbsp;
      <span className={styles.RNA} >RNA</span>
      <span className={styles.canvas} >canvas</span>
    </p>
  );

  let underline = <div className={styles.underline} />;

  return (
    <div className={styles.header} >
      {title}
      {underline}
    </div>
  );
}
