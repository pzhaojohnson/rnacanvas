import * as React from 'react';

import styles from './DottedVersionLink.css';

import { VersionLink } from './VersionLink';

import { Props } from './VersionLink';

function Dot() {
  return <div className={styles.dot} />
}

export { Props };

export function DottedVersionLink(props: Props) {
  return (
    <div className={styles.dottedVersionLink} >
      <Dot />
      <VersionLink {...props} />
    </div>
  );
}
