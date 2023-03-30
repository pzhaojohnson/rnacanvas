import * as React from 'react';

import styles from './PreviousVersionsList.css';

import { ErrorBoundary } from 'Utilities/react/ErrorBoundary';

import { VersionLink } from './VersionLink';

/**
 * Add or remove version IDs from this array to control which previous
 * versions are included in the list.
 */
const previousVersionIds = [
  '20221216t094916',
];

/**
 * A list with links to previous versions of the app.
 */
export function PreviousVersionsList() {
  return (
    <div className={styles.previousVersionsList} >
      {previousVersionIds.map((id, i) => {
        <ErrorBoundary key={i} >
          <VersionLink versionId={id} />
        </ErrorBoundary>
      })}
    </div>
  );
}
