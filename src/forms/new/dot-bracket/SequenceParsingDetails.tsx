import * as React from 'react';
import styles from './ParsingDetails.css';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';

interface Props {
  ignoringNumbers: boolean;
  ignoreNumbers: (b: boolean) => void;
  ignoringNonAugctLetters: boolean;
  ignoreNonAugctLetters: (b: boolean) => void;
  ignoringNonAlphanumerics: boolean;
  ignoreNonAlphanumerics: (b: boolean) => void;
}

export function IgnoreNumbersCheckbox(props: Props) {
  return (
    <CheckboxField
      label='Ignore Numbers'
      checked={props.ignoringNumbers}
      onChange={event => props.ignoreNumbers(event.target.checked)}
      style={{ alignSelf: 'start', fontWeight: 400, color: 'hsl(240deg 2% 3%)' }}
    />
  );
}

export function IgnoreNonAugctLettersCheckbox(props: Props) {
  return (
    <CheckboxField
      label='Ignore Non-AUGCT Letters'
      checked={props.ignoringNonAugctLetters}
      onChange={event => props.ignoreNonAugctLetters(event.target.checked)}
      style={{ fontWeight: 400, color: 'hsl(240deg 2% 3%)' }}
    />
  );
}

export function IgnoreNonAlphanumericsCheckbox(props: Props) {
  return (
    <CheckboxField
      label='Ignore Non-Alphanumerics'
      checked={props.ignoringNonAlphanumerics}
      onChange={event => props.ignoreNonAlphanumerics(event.target.checked)}
      style={{ fontWeight: 400, color: 'hsl(240deg 2% 3%)' }}
    />
  );
}

export function SequenceParsingDetails(props: Props) {
  return (
    <div className={styles.parsingDetails} style={{ width: '366px', margin: '24px 0px 0px 14px' }} >
      <h3 className={styles.header} >
        Sequence Parsing Details
      </h3>
      <div style={{ marginLeft: '9px' }} >
        <div style={{ height: '7px' }} />
        <p>
          All letters, numbers, and non-alphanumeric characters are read in as individual bases, unless specified to be ignored.
        </p>
        <div style={{ margin: '10px 0 0 10px', display: 'flex', flexDirection: 'column' }} >
          <IgnoreNumbersCheckbox {...props} />
          <div style={{ marginTop: '8px', alignSelf: 'start' }} >
            <IgnoreNonAugctLettersCheckbox {...props} />
          </div>
          <div style={{ marginTop: '8px', alignSelf: 'start' }} >
            <IgnoreNonAlphanumericsCheckbox {...props} />
          </div>
        </div>
        <div style={{ height: '10px' }} />
        <p>
          All whitespace is ignored.
        </p>
      </div>
    </div>
  );
}
