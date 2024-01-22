import * as React from 'react';
import fieldStyles from './DotBracketField.css';
import fieldLabelStyles from './FieldLabel.css';
import fieldDescriptionStyles from './FieldDescription.css';
import { DetailsToggle } from './DetailsToggle';

function DotBracketFieldDescription() {
  return (
    <span
      className={fieldDescriptionStyles.fieldDescription}
      style={{ marginLeft: '12px' }}
    >
      <span>
        ...in dot-bracket notation "(((((......)))))"
      </span>
      <span style={{ marginLeft: '12px' }} >
        ...also called "Vienna" format
      </span>
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

export function DotBracketField(props: Props) {
  return (
    <div style={{ flexGrow: props.flexGrow, display: 'flex', flexDirection: 'column' }} >
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row', position: 'relative' }} >
        <label
          className={fieldLabelStyles.fieldLabel}
          htmlFor='structure'
          style={{ flexGrow: 1, cursor: 'text' }}
        >
          Structure
          {props.showDescription ? <DotBracketFieldDescription /> : null}
        </label>
        <DetailsToggle
          onClick={() => props.toggleParsingDetails()}
          style={{ position: 'absolute', top: '-2px', right: '1px' }}
        />
      </div>
      <textarea
        id='structure'
        className={fieldStyles.textArea}
        value={props.initialValue}
        onChange={event => props.set(event.target.value)}
        spellCheck={'false'}
      />
    </div>
  );
}
