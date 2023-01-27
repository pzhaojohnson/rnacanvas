import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';
import { Props as TextInputFieldProps } from 'Forms/inputs/text/TextInputField';

export type Props = (
  Omit<TextInputFieldProps, 'onKeyUp'>
  & {
    onEnterKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  }
);

export function EndPositionField(props: Props) {
  return (
    <TextInputField
      {...props}
      label='End Position'
      onKeyUp={event => {
        if (event.key.toLowerCase() == 'enter') {
          props.onEnterKeyUp(event);
        }
      }}
      input={{ spellCheck: false, style: { minWidth: '8ch' } }}
      style={{ alignSelf: 'flex-start', margin: '8px 8px 0 0' }}
    />
  );
}
