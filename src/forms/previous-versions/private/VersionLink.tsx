import * as React from 'react';

import styles from './VersionLink.css';

import { VersionId } from './VersionId';

import { Month } from './Month';

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
    </a>
  );
}
