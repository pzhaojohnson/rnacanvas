import * as React from 'react';

import { SubmitButton } from 'Forms/buttons/SubmitButton';

export type Props = {
  onClick: () => void;
};

export function SelectButton(props: Props) {
  let onClick = props.onClick;

  let style: React.CSSProperties = {
    marginTop: '38px',
    alignSelf: 'start',
  };

  return (
    <SubmitButton onClick={onClick} style={style} >
      Select
    </SubmitButton>
  );
}
