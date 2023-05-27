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
        margin: '10px 0 0 4px',
        alignSelf: 'start',
        padding: '1px 14px',
        fontSize: '11px',
        fontWeight: 500,
        ...props.style,
      }}
    >
      Options
    </_OptionsToggle>
  );
}
