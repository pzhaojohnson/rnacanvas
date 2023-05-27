import * as React from 'react';
import { SubmitButton } from 'Forms/buttons/SubmitButton';

export type Props = {
  onClick: () => void;
};

export function AddButton(props: Props) {
  return (
    <SubmitButton
      onClick={props.onClick}
      style={{ margin: '40px 0 0 0', alignSelf: 'start' }}
    >
      Add
    </SubmitButton>
  );
}
