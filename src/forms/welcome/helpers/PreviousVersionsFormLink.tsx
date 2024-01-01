import * as React from 'react';

import styles from './PreviousVersionsFormLink.css';

function Arrow() {
  let head = (
    <path
      className={styles.arrowHead}
      d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  );

  let shaft = (
    <line
      className={styles.arrowShaft}
      x1="6.75" y1="7.25" x2="13.25" y2="0.75"
      strokeWidth="1.5" strokeLinecap="round"
    />
  );

  return (
    <svg className={styles.arrow} viewBox="0 0 14 12" >
      {head}
      {shaft}
    </svg>
  );
}

export type Props = {
  onClick: () => void;
};

export function PreviousVersionsFormLink(props: Props) {
  let leadingText = (
    <p className={styles.surroundingText} >
      To use
    </p>
  );

  // just meant to look like an anchor element
  let anchor = (
    <p className={styles.anchor} >
      Previous Versions
    </p>
  );

  let anchorWithArrow = (
    <div className={styles.anchorWithArrow} onClick={props.onClick} >
      {anchor}
      <Arrow />
    </div>
  );

  let trailingText = (
    <p className={styles.surroundingText} style={{ marginLeft: '3px' }} >
      of the app.
    </p>
  );

  return (
    <div className={styles.previousVersionsFormLink} >
      {leadingText}&nbsp;{anchorWithArrow} {trailingText}
    </div>
  );
}
