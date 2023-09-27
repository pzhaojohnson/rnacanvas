import * as React from 'react';
import { OptionsToggle as _OptionsToggle } from 'Forms/buttons/OptionsToggle';

export type Props = {
  onClick?: () => void;
  style?: React.CSSProperties;
};

export function OptionsToggle(props: Props) {
  return (
    <_OptionsToggle
      onClick={props.onClick}
      style={{
        margin: '10px 0 0 5px',
        alignSelf: 'start',
        padding: '0px 16px',
        minHeight: '21px',
        ...props.style,
      }}
    >
      Options
    </_OptionsToggle>
  );
}
