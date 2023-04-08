import * as React from 'react';

import styles from './Header.css';

export type Props = {
  /**
   * A back button that can optionally be rendered in the header of
   * this form.
   */
  backButton?: React.ReactNode;
};

export function Header(props: Props) {
  let backButtonContainer = (
    <div className={styles.backButtonContainer} >
      {props.backButton}
    </div>
  );

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
      {backButtonContainer}
      {title}
      {underline}
    </div>
  );
}
