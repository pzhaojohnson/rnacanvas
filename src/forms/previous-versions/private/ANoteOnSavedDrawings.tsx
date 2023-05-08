import * as React from 'react';

import styles from './ANoteOnSavedDrawings.css';

export function ANoteOnSavedDrawings() {
  let leadingText = (
    <p className={styles.leadingText} >
      One thing to note...
    </p>
  );

  let mainText = (
    <p className={styles.mainText} >
      Saved drawings from later versions of the app
      are not compatible with earlier versions of the app.
    </p>
  );

  return (
    <div className={styles.aNoteOnSavedDrawings} >
      {leadingText}
      {mainText}
    </div>
  );
}
