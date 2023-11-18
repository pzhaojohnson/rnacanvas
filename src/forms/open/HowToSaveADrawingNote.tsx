import * as React from 'react';

import styles from './HowToSaveADrawingNote.css';

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox='0 0 12 10' >
      <path
        className={styles.arrowPath}
        d='M 1 5 H 10 M 7 1 L 11 5 L 7 9'
      />
    </svg>
  );
}

export function HowToSaveADrawingNote() {
  let file = <span className={styles.topMenuItem} >File</span>;

  let arrow = <Arrow />;

  let save = <span className={styles.topMenuItem} >Save</span>;

  return (
    <p className={styles.howToSaveADrawingNote} >
      Drawings can be saved using the {file} {arrow} {save} top menu button.
    </p>
  );
}
