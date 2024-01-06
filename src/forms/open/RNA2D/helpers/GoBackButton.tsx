import * as React from 'react';

import styles from './GoBackButton.css';

function BackArrow() {
  let head = (
    <path
      className={styles.backArrowHead}
      d="M 6 1 L 1 7 L 6 13"
    />
  );

  let shaft = (
    <line
      className={styles.backArrowShaft}
      x1="1" y1="7" x2="15" y2="7"
    />
  );

  return (
    <svg className={styles.backArrow} viewBox="0 0 16 14" >
      {head}
      {shaft}
    </svg>
  );
}

export type Props = {
  onClick: () => void;
};

export function GoBackButton(props: Props) {
  let { onClick } = props;

  let className = styles.goBackButton;

  let goBackText = (
    <span className={styles.goBackText} >
      Go Back
    </span>
  );

  return (
    <button {...{ className, onClick }} >
      <BackArrow /> {goBackText}
    </button>
  );
}
