import * as React from 'react';

import styles from './VersionLink.css';

import { VersionId } from './VersionId';

import { Month } from './Month';

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
    <svg width="14px" height="12px" viewBox="0 0 14 12" >
      {head}
      {shaft}
    </svg>
  );
}

export type Props = {
  /**
   * A Google App Engine version ID.
   */
  versionId: string;

  style?: React.CSSProperties;
};

/**
 * A link to a specific version of the app.
 */
export function VersionLink(props: Props) {
  let className = styles.versionLink;

  let versionId = new VersionId(props.versionId);

  let date = versionId.toDate();
  let month = new Month({ index: date.getMonth() });
  let day = date.getDate();
  let year = date.getFullYear();

  let href = versionId.toURLString();

  // open in new tab
  let target = '_blank';

  // a good general practice to prevent tabnabbing
  let rel = 'noreferrer noopener';

  let style = props.style;

  return (
    <a {...{ className, href, target, rel, style }} >
      {month.fullName} {day}, {year}
      <Arrow />
    </a>
  );
}
