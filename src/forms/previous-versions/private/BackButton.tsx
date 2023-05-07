import * as React from 'react';

import styles from './BackButton.css';

function BackArrow() {
  let head = (
    <path
      d="M 6 1 L 1 7 L 6 13"
      stroke="hsl(240, 72.41%, 31.61%)" strokeWidth="2" strokeLinecap="round"
      fill="none"
    />
  );

  let shaft = (
    <line
      x1="1" y1="7" x2="15" y2="7"
      stroke="hsl(240, 72.41%, 31.61%)" strokeWidth="2" strokeLinecap="round"
    />
  );

  return (
    <svg height="14px" viewBox="0 0 16 14" >
      {head}
      {shaft}
    </svg>
  );
}

export type Props = {
  onClick?: () => void;
};

export function BackButton(props: Props) {
  let className = styles.backButton;

  let onClick = props.onClick;

  let text = (
    <p className={styles.text} >
      Go Back
    </p>
  );

  return (
    <div {...{ className, onClick }} >
      <BackArrow />
      {text}
    </div>
  );
}
