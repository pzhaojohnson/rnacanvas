import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';

export type Props = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onEnterKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function MinValueField(props: Props) {
  return (
    <TextInputField
      label='Minimum Value'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyUp={event => {
        if (event.key.toLowerCase() == 'enter' && props.onEnterKeyUp) {
          props.onEnterKeyUp(event);
        }
      }}
      input={{ spellCheck: false, style: { minWidth: '7ch' } }}
      style={{ margin: '9px 0 0 12px', alignSelf: 'start' }}
    />
  );
}
