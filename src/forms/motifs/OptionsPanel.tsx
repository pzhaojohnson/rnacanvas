import type { Options } from './FindMotifsForm';

import * as React from 'react';

import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import { Props as CheckboxFieldProps } from 'Forms/inputs/checkbox/CheckboxField';

import { AllowedMismatchField } from './AllowedMismatchField';

import { InfoLink } from 'Forms/info/InfoLink';

function UTField(props: CheckboxFieldProps) {
  return (
    <CheckboxField
      label='Match Us and Ts'
      checked={props.checked}
      onChange={props.onChange}
      style={{ alignSelf: 'start' }}
    />
  );
}

function IUPACField(props: CheckboxFieldProps) {
  let style: React.CSSProperties = {
    margin: '6px 0 0 0',
    alignSelf: 'start',
    display: 'flex',
    flexDirection: 'row',
  };
  return (
    <div style={style} >
      <CheckboxField
        label='Use IUPAC Single Letter Codes'
        checked={props.checked}
        onChange={props.onChange}
      />
      <InfoLink
        href='https://www.bioinformatics.org/sms/iupac.html'
        title='View IUPAC single letter codes.'
        style={{ padding: '0 7px 0 5px', fontSize: '11px' }}
      />
    </div>
  );
}

function TreatMotifAsRegExpField(props: CheckboxFieldProps) {
  let style: React.CSSProperties = {
    margin: '8px 0 0 0',
    alignSelf: 'start',
    display: 'flex',
    flexDirection: 'row',
  };
  return (
    <div style={style} >
      <CheckboxField
        label='Treat Motif as a Regular Expression'
        checked={props.checked}
        onChange={props.onChange}
      />
      <InfoLink
        href='https://regexone.com/'
        title='Learn about Regular Expressions.'
        style={{ padding: '0 7px 0 5px', fontSize: '11px' }}
      />
    </div>
  );
}

export type Props = {
  value: Options;
  onChange: (event: { target: { value: Options } }) => void;
};

export function OptionsPanel(props: Props) {
  return (
    <div style={{ margin: '11px 0 0 16px', display: 'flex', flexDirection: 'column' }} >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }} >
        <UTField
          checked={props.value.UT}
          onChange={event => {
            let UT = event.target.checked;
            props.onChange({ target: { value: { ...props.value, UT } } });
          }}
        />
        <IUPACField
          checked={props.value.IUPAC}
          onChange={event => {
            let IUPAC = event.target.checked;
            props.onChange({ target: { value: { ...props.value, IUPAC } } });
          }}
        />
        <AllowedMismatchField
          value={props.value.allowedMismatch}
          onSubmit={event => {
            let allowedMismatch = event.target.value;
            props.onChange({ target: { value: { ...props.value, allowedMismatch } } });
          }}
        />
        {!props.value.treatMotifAsRegExp ? null : (
          // shrouds the above option fields
          <div style={{
            position: 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px',
            backgroundColor: 'white', opacity: 0.8,
          }} />
        )}
      </div>
      <TreatMotifAsRegExpField
        checked={props.value.treatMotifAsRegExp}
        onChange={event => {
          let treatMotifAsRegExp = event.target.checked;
          props.onChange({ target: { value: { ...props.value, treatMotifAsRegExp } } });
        }}
      />
    </div>
  );
}
