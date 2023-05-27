import * as React from 'react';
import { CheckboxField } from 'Forms/inputs/checkbox/CheckboxField';

export type Props = {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function IncludeSubstructureField(props: Props) {
  return (
    <CheckboxField
      label='Include Substructure'
      checked={props.checked}
      onChange={props.onChange}
      style={{ marginTop: '39px', alignSelf: 'start' }}
    />
  );
}
