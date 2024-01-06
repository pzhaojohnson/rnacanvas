import * as React from 'react';

import styles from './WhatAreRNA2DSchemas.css';

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

export function WhatAreRNA2DSchemas() {
  let rna2DJSONSchemas = (
    <p className={styles.rna2DJSONSchemas} >
      RNA 2D JSON schemas
    </p>
  );

  let interveningText = (
    <p className={styles.interveningText} >
      are a nucleic acid structure drawing format of
    </p>
  );

  let r2dtText = (
    <span className={styles.r2dtText} >
      R2DT
    </span>
  );

  let r2dt = (
    <a
      className={styles.r2dt}
      href='https://r2dt.bio/'
      target='_blank'
      rel='noreferrer noopener'
    >
      {r2dtText} <LinkArrow/>
    </a>
  );

  return (
    <div className={styles.whatAreRNA2DSchemas} >
      {rna2DJSONSchemas}&nbsp;{interveningText}&nbsp;{r2dt}
    </div>
  );
}
