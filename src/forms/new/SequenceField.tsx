import * as React from 'react';
import { TextButton } from 'Forms/buttons/TextButton';

interface Props {
  initialValue: string;
  set: (s: string) => void;
  toggleParsingDetails: () => void;
  flexGrow: number;
}

export function SequenceField(props: Props): React.ReactElement {
  return (
    <div style={{ flexGrow: props.flexGrow, display: 'flex', flexDirection: 'column' }} >
      <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'row' }} >
        <p className={'unselectable-text'} style={{ flexGrow: 1, fontSize: '12px' }} >
          Sequence
        </p>
        <div style={{ marginRight: '4px' }} >
          <TextButton
            text='Details'
            onClick={() => props.toggleParsingDetails()}
          />
        </div>
      </div>
      <textarea
        value={props.initialValue}
        onChange={event => props.set(event.target.value)}
        spellCheck={'false'}
        placeholder={
          '...an RNA or DNA sequence ..."ACCUUCUGCCAGAGGU"'
          + ' ...input parameters are to the right'
        }
        style={{
          flexGrow: 1,
          margin: '4px 0px 0px 0px',
          fontSize: '12px',
        }}
      />
    </div>
  );
}
