import * as React from 'react';
import styles from './DataField.css';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

export type Props = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export function DataField(props: Props) {
  return (
    <FieldLabel
      style={{
        display: 'flex', flexDirection: 'column',
        cursor: 'text',
      }}
    >
      Data
      <textarea
        className={styles.dataTextArea}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        rows={12}
        placeholder='...delimit with whitespace, commas and semicolons'
        spellCheck={false}
        style={{ marginTop: '4px' }}
      />
    </FieldLabel>
  );
}
