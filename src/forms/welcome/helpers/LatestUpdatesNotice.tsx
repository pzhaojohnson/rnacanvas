import * as React from 'react';

import styles from './LatestUpdatesNotice.css';

function LatestUpdatesDate() {
  return (
    <p className={styles.latestUpdatesDate} >
      (Dec. 2, 2023)
    </p>
  );
}

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

function LinkArrow() {
  let head = (
    <path
      className={styles.linkArrowHead}
      d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  );

  let shaft = (
    <line
      className={styles.linkArrowShaft}
      x1="6.75" y1="7.25" x2="13.25" y2="0.75"
      strokeWidth="1.5" strokeLinecap="round"
    />
  );

  return (
    <svg className={styles.linkArrow} viewBox="0 0 14 12" >
      {head}
      {shaft}
    </svg>
  );
}

function LatestUpdatesLinkWithArrow() {
  return (
    <div className={styles.latestUpdatesLinkWithArrow} >
      <LatestUpdatesLink />
      <LinkArrow />
    </div>
  );
}

export function LatestUpdatesNotice() {
  let interveningText = (
    <p className={styles.interveningText} >
      See the
    </p>
  );

  return (
    <div className={styles.latestUpdatesNotice} >
      <LatestUpdatesDate />&nbsp;{interveningText}&nbsp;<LatestUpdatesLinkWithArrow />
    </div>
  );
}
