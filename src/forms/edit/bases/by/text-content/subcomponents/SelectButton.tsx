import * as React from 'react';

import { SubmitButton } from 'Forms/buttons/SubmitButton';

export type Props = {
  onClick: () => void;
};

export function SelectButton(props: Props) {
  let onClick = props.onClick;

  return (
    <SubmitButton onClick={onClick} >
      Select
    </SubmitButton>
  );
}
