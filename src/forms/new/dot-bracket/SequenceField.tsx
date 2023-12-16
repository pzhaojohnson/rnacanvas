import * as React from 'react';
import fieldStyles from './SequenceField.css';
import fieldLabelStyles from './FieldLabel.css';
import fieldDescriptionStyles from './FieldDescription.css';
import { DetailsToggle } from './DetailsToggle';

function SequenceFieldDescription() {
  return (
    <span
      className={fieldDescriptionStyles.fieldDescription}
      style={{ marginLeft: '12px' }}
    >
      ...an RNA or DNA sequence "ACCUUCUGCCAGAGGU"
    </span>
  );
}

interface Props {
  initialValue: string;
  set: (s: string) => void;
  toggleParsingDetails: () => void;
  showDescription?: boolean;
  flexGrow: number;
}

export function SequenceField(props: Props) {
  return (
    <div style={{ flexGrow: props.flexGrow, display: 'flex', flexDirection: 'column' }} >
      <div style={{ marginTop: '29px', display: 'flex', flexDirection: 'row', position: 'relative' }} >
        <label
          className={fieldLabelStyles.fieldLabel}
          htmlFor='sequence'
          style={{ flexGrow: 1, cursor: 'text' }}
        >
          Sequence
          {props.showDescription ? <SequenceFieldDescription /> : null}
        </label>
        <DetailsToggle
          onClick={() => props.toggleParsingDetails()}
          style={{ position: 'absolute', top: '-2px', right: '1px' }}
        />
      </div>
      <textarea
        id='sequence'
        className={fieldStyles.textArea}
        value={props.initialValue}
        onChange={event => props.set(event.target.value)}
        spellCheck={'false'}
      />
    </div>
  );
}
