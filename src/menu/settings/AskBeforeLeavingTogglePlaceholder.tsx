import * as React from 'react';

import styles from './AskBeforeLeavingTogglePlaceholder.css';

/**
 * To be rendered when the ask-before-leaving toggle does not apply
 * (e.g., when the drawing is empty).
 */
export function AskBeforeLeavingTogglePlaceholder() {
  return (
    <div className={styles.askBeforeLeavingTogglePlaceholder} />
  );
}
