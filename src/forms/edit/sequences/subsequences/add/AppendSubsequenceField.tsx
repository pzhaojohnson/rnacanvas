import * as React from 'react';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';
import { Props } from 'Forms/inputs/checkbox/CheckboxField';

export function AppendSubsequenceField(props: Props) {
  return (
    <CheckboxField
      label='Append Subsequence'
      checked={props.checked}
      onChange={props.onChange}
      style={{ margin: '39px 0 0 0', alignSelf: 'start' }}
    />
  );
}
