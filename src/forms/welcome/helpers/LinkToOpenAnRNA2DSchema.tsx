import * as React from 'react';

import styles from './LinkToOpenAnRNA2DSchema.css';

function LinkArrow() {
  let head = (
    <path
      className={styles.linkArrowHead}
      d="M 8.75 0.75 L 13.25 0.75 L 13.25 5.75"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  );

  let shaft = (
    <line
      className={styles.linkArrowShaft}
      x1="6.75" y1="7.25" x2="13.25" y2="0.75"
      strokeWidth="1.5" strokeLinecap="round"
    />
  );

  return (
    <svg className={styles.linkArrow} viewBox="0 0 14 12" >
      {head}
      {shaft}
    </svg>
  );
}

export type Props = {
  onClick: () => void;
};

export function LinkToOpenAnRNA2DSchema(props: Props) {
  let { onClick } = props;

  let className = styles.linkToOpenAnRNA2DSchema;

  let text = (
    <span className={styles.text} >
      Or open an RNA 2D JSON schema
    </span>
  );

  return (
    <button {...{ className, onClick }} >
      {text} <LinkArrow />
    </button>
  );
}
