import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';

export type Props = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onEnterKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function StartPositionField(props: Props) {
  return (
    <TextInputField
      label='Start Position of Data'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={event => {
        if (event.key.toLowerCase() == 'enter' && props.onEnterKeyUp) {
          props.onEnterKeyUp(event);
        }
      }}
      input={{ spellCheck: false, style: { minWidth: '8ch' } }}
      style={{ marginTop: '38px', alignSelf: 'start' }}
    />
  );
}
