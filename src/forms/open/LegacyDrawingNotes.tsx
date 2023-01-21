import * as React from 'react';

import styles from './LegacyDrawingNotes.css';

function Disclaimer() {
  return (
    <div className={styles.disclaimer} >
      <p className={styles.text} >
        Old drawings from before the RNA2Drawer web app
        will not be entirely preserved.
      </p>
    </div>
  );
}

function PreservedItem(
  props: {
    children?: React.ReactNode,
  },
) {
  return (
    <div className={styles.preservedItem} >
      <div className={styles.solidDot} />
      <div style={{ width: '8px' }} />
      <p className={styles.text} >
        {props.children}
      </p>
    </div>
  );
}

function PreservedItemsList() {
  let leadingText = (
    <p className={styles.text} style={{ margin: '0' }} >
      Only...
    </p>
  );

  let trailingText = (
    <p className={styles.text} style={{ margin: '10px 0 0 0' }} >
      ...will be preserved for drawings from before the RNA2Drawer web app.
    </p>
  );

  return (
    <div style={{ margin: '14px 0 0 28px' }} >
      {leadingText}
      <div style={{ margin: '10px 0px 0px 22px' }} >
        <PreservedItem>
          The sequence and its ID.
        </PreservedItem>
        <PreservedItem>
          The secondary structure.
        </PreservedItem>
        <PreservedItem>
          Tertiary interactions and their colors.
        </PreservedItem>
        <PreservedItem>
          Base numbering and the numbering offset.
        </PreservedItem>
        <PreservedItem>
          Base colors and outlines.
        </PreservedItem>
      </div>
      {trailingText}
    </div>
  );
}

export function LegacyDrawingNotes() {
  return (
    <div className={styles.legacyDrawingNotes} >
      <Disclaimer />
      <PreservedItemsList />
    </div>
  );
}
