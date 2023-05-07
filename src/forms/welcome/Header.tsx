import * as React from 'react';
import styles from './Header.css';
import { AppIcon } from './AppIcon';

function AppName() {
  return (
    <div className={styles.appName} >
      <p className={styles.RNA} >
        RNA
      </p>
      <p className={styles.canvas} >
        canvas
      </p>
    </div>
  );
}

function RightText() {
  let style: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', alignSelf: 'end',
  };
  return (
    <div {...{ style }} >
      <p className={styles.rightText} >
        Last Updated on July 6, 2022
      </p>
    </div>
  );
}

function Underline() {
  return (
    <div className={styles.underline} />
  );
}

export function Header() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} >
      <div style={{
        margin: '0px 54px 0px 67px',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
      }} >
        <AppIcon />
        <div style={{ width: '18px' }} />
        <AppName />
      </div>
      <Underline />
    </div>
  );
}
