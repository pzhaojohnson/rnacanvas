import * as React from 'react';
import { OptionsToggle as _OptionsToggle } from 'Forms/buttons/OptionsToggle';

type Props = {
  onClick: () => void;
};

export function OptionsToggle(props: Props) {
  return (
    <_OptionsToggle
      onClick={props.onClick}
      style={{
        margin: '14px 0 0 7px',
        alignSelf: 'start',
        padding: '0px 16px',
        minHeight: '21px',
      }}
    >
      Options
    </_OptionsToggle>
  );
}
