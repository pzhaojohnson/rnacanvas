import * as React from 'react';
import { DetailsToggle as _DetailsToggle } from 'Forms/buttons/DetailsToggle';

export type Props = {
  onClick?: () => void;

  style?: React.CSSProperties;
};

export function DetailsToggle(props: Props) {
  return (
    <_DetailsToggle
      onClick={props.onClick}
      style={{
        minWidth: '72px',
        minHeight: '19px',
        padding: '0px',
        fontSize: '11px',
        ...props.style,
      }}
    >
      Details
    </_DetailsToggle>
  );
}
