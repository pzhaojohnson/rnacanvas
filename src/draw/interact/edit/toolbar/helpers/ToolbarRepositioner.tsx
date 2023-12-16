/** @jsx h */

import { h } from 'dom-chef';

import styles from './ToolbarRepositioner.css';

export function ToolbarRepositioner() {
  let toolbarRepositioner = (
    <svg className={styles.toolbarRepositioner} width='22px' height='22px' viewBox='0 0 10 10' >
      <path
        d='M 3 6 L 5 4 L 7 6'
        stroke='white'
        stroke-width='1'
        stroke-linecap='round'
        stroke-linejoin='round'
        fill='none'
      />
    </svg>
  );

  let container = (
    <div className={styles.container} >
      {toolbarRepositioner}
      {Tooltip()}
    </div>
  );

  return container;
}

function Tooltip() {
  let text = (
    <p className={styles.tooltipText} >
      Reposition the toolbar.
    </p>
  );

  let triangle = <div className={styles.tooltipTriangle} />;

  return (
    <div className={styles.tooltip} >
      {text}
      {triangle}
    </div>
  );
}
