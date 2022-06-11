import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';

export type Props = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

export function PositionToInsertAtField(props: Props) {
  return (
    <TextInputField
      label='Position to Insert At'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      input={{ style: { width: `${Math.max(props.value.length, 8)}ch` } }}
      style={{ margin: '38px 8px 0 0', alignSelf: 'start' }}
    />
  );
}
