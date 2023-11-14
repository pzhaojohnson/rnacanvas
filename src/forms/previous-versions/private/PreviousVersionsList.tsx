import * as React from 'react';

import styles from './PreviousVersionsList.css';

import { ErrorBoundary } from 'Utilities/react/ErrorBoundary';

import { DottedVersionLink } from './DottedVersionLink';

/**
 * Add or remove version IDs from this array to control which previous
 * versions are included in the list.
 */
const previousVersionIds = [
  '20231005t114629',
  '20230824t054455',
  '20230529t085657',
  '20221216t094916',
];

/**
 * A list with links to previous versions of the app.
 */
export function PreviousVersionsList() {
  return (
    <div className={styles.previousVersionsList} >
      {previousVersionIds.map((id, i) => (
        <ErrorBoundary key={i} >
          <DottedVersionLink versionId={id} />
        </ErrorBoundary>
      ))}
    </div>
  );
}
