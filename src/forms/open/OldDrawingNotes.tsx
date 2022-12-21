import * as React from 'react';

import styles from './OldDrawingNotes.css';

function Disclaimer() {
  return (
    <div className={styles.disclaimer} >
      <p className={styles.text} >
        Old drawings from before the RNA2Drawer web app will not be entirely preserved.
      </p>
    </div>
  );
}

function PreservedAspect(
  props: {
    children?: React.ReactNode,
  },
) {
  return (
    <div className={styles.preservedAspect} >
      <div className={styles.solidDot} />
      <div style={{ width: '8px' }} />
      <p className={styles.text} >
        {props.children}
      </p>
    </div>
  );
}

function PreservedAspectsList() {
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
        <PreservedAspect>The sequence and its ID.</PreservedAspect>
        <PreservedAspect>The secondary structure.</PreservedAspect>
        <PreservedAspect>Tertiary interactions and their colors.</PreservedAspect>
        <PreservedAspect>Base numbering and the numbering offset.</PreservedAspect>
        <PreservedAspect>Base colors and outlines.</PreservedAspect>
      </div>
      {trailingText}
    </div>
  );
}

export function OldDrawingNotes() {
  return (
    <div className={styles.oldDrawingNotes} >
      <Disclaimer />
      <PreservedAspectsList />
    </div>
  );
}
