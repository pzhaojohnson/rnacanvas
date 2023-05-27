import * as React from 'react';
import { SubmitButton } from 'Forms/buttons/SubmitButton';

export type Props = {
  onClick: () => void;
};

export function RemoveButton(props: Props) {
  return (
    <SubmitButton
      onClick={props.onClick}
      style={{ marginTop: '39px' }}
    >
      Remove
    </SubmitButton>
  );
}
