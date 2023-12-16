import * as React from 'react';
import styles from './ParsingDetails.css';

export function DotBracketParsingDetails() {
  return (
    <div className={styles.parsingDetails} style={{ width: '366px', margin: '24px 0px 0px 14px' }} >
      <h3 className={styles.header} >
        Structure Parsing Details
      </h3>
      <div style={{ marginLeft: '9px' }} >
        <p style={{ marginTop: '7px' }} >
          Periods "." indicate unpaired bases.
        </p>
        <p style={{ marginTop: '9px' }} >
          Matching parentheses "( )" indicate base-pairs in the secondary structure.
        </p>
        <p style={{ marginTop: '9px' }} >
          {'Pseudoknot base-pairs are indicated by "[ ]", "{ }" and "< >".'}
        </p>
        <p style={{ marginTop: '9px' }} >
          All other characters and whitespace are ignored.
        </p>
      </div>
    </div>
  );
}
