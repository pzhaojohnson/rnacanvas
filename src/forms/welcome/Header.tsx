import * as React from 'react';
import styles from './Header.css';
import { AppIcon } from './AppIcon';

import { RNAcanvasReferencesDialogShowerBuilder as CiteFormShowerBuilder } from 'Forms/cite/RNAcanvas-references-dialog/RNAcanvasReferencesDialogShowerBuilder';

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

function CitationsRequest() {
  let onClick = () => citeFormShower.show();

  let Citing = (
    <span className={styles.citeLink} onClick={onClick} >
      <span className={styles.citeLinkText}>
        Citing
      </span>
      <LinkArrow />
    </span>
  );

  return (
    <p className={styles.citationsRequest} >
      {Citing} RNAcanvas is the best way to show support!
    </p>
  );
}

function LinkArrow() {
  return (
    <svg viewBox="0 0 14 12" style={{ height: '14px', translate: '-3px 2px', cursor: 'pointer' }} >
      <path
        d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
        stroke="blue" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      ></path>
      <line
        x1="6.75" y1="7.25" x2="13.25" y2="0.75"
        stroke="blue" strokeWidth="1.5" strokeLinecap="round"
      ></line>
    </svg>
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
        <div style={{ flexGrow: 1 }} />
        <CitationsRequest />
      </div>
      <Underline />
    </div>
  );
}

const citeFormShower = (new CiteFormShowerBuilder()).build();
