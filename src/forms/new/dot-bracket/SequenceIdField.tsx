import * as React from 'react';
import fieldStyles from './SequenceIdField.css';
import fieldLabelStyles from './FieldLabel.css';

interface Props {
  initialValue: string;
  set: (v: string) => void;
}

export function SequenceIdField(props: Props) {
  return (
    <label
      className={fieldLabelStyles.fieldLabel}
      style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        cursor: 'text',
      }}
    >
      Sequence ID
      <input
        type='text'
        className={fieldStyles.textInput}
        value={props.initialValue}
        onChange={event => props.set(event.target.value)}
        spellCheck={'false'}
      />
    </label>
  );
}
