/** @jsx h */

import { h } from 'dom-chef';

import styles from './GrabHatch.css';

function Line() {
  return <div className={styles.line} />;
}

export function GrabHatch() {
  return (
    <div className={styles.grabHatch} >
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
    </div>
  );
}
