import * as React from 'react';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';
import { TextArea } from 'Forms/inputs/text/TextArea';
import { TextButton } from 'Forms/buttons/TextButton';

interface Props {
  initialValue: string;
  set: (s: string) => void;
  toggleParsingDetails: () => void;
  flexGrow: number;
}

export function DotBracketField(props: Props): React.ReactElement {
  return (
    <div style={{ flexGrow: props.flexGrow, display: 'flex', flexDirection: 'column' }} >
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'row' }} >
        <FieldLabel
          htmlFor='structure'
          style={{ flexGrow: 1, cursor: 'text', fontWeight: 700, color: '#202024' }}
        >
          Structure
        </FieldLabel>
        <div style={{ marginRight: '3px' }} >
          <TextButton
            text='Details...'
            onClick={() => props.toggleParsingDetails()}
            style={{ fontWeight: 500, color: '#090972' }}
          />
        </div>
      </div>
      <TextArea
        id='structure'
        value={props.initialValue}
        onChange={event => props.set(event.target.value)}
        spellCheck={'false'}
        placeholder={
          '...the structure in dot-bracket notation "(((((......)))))"'
          + '  ...also called "Vienna" format by Mfold and RNAfold'
        }
        style={{
          flexGrow: 1,
          margin: '4px 0px 0px 0px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#787882',
        }}
      />
    </div>
  );
}
