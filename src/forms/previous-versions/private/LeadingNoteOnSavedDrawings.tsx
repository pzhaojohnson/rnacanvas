import * as React from 'react';

import styles from './LeadingNoteOnSavedDrawings.css';

export function LeadingNoteOnSavedDrawings() {
  let leadingText = (
    <p className={styles.leadingText} >
      One thing to note...
    </p>
  );

  let mainText = (
    <p className={styles.mainText} >
      Saved drawings from later versions of the app
      might not be compatible with earlier versions of the app.
    </p>
  );

  return (
    <div className={styles.leadingNoteOnSavedDrawings} >
      {leadingText}
      {mainText}
    </div>
  );
}
