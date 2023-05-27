import * as React from 'react';

// the underlying ErrorMessage component
import { ErrorMessage as _ErrorMessage } from 'Forms/ErrorMessage';

export type Props = {
  children?: React.ReactNode;
};

export function ErrorMessage(props: Props) {
  return (
    <_ErrorMessage style={{ marginTop: '7px' }} >
      {props.children}
    </_ErrorMessage>
  );
}
