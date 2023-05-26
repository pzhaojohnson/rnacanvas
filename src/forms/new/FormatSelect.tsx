import * as React from 'react';
import { useState } from 'react';

import styles from './FormatSelect.css';

export const formats = ['Dot-Bracket', 'CT'] as const;
export type Format = typeof formats[number];

const formatButtonTitles = {
  'Dot-Bracket': 'Input a structure in dot-bracket notation.',
  'CT': 'Input a structure in CT format.',
};

function FormatButton(
  props: {
    isToggled: boolean,
    title?: string;
    onClick: () => void,
    children: React.ReactNode,
  },
) {
  let toggledStyles = styles.toggledFormatButton;
  let untoggledStyles = styles.untoggledFormatButton;
  return (
    <button
      className={`
        ${styles.formatButton}
        ${props.isToggled ? toggledStyles : untoggledStyles}
      `}
      title={props.title}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export type ChangeEvent = {
  target: {
    value: Format;
  }
};

export type Props = {
  value: Format;

  onChange: (event: ChangeEvent) => void;
};

export function FormatSelect(props: Props) {
  let [value, setValue] = useState(props.value);

  let formatButtons = formats.map((format, i) => (
    <FormatButton
      key={i}
      isToggled={format == value}
      title={formatButtonTitles[format]}
      onClick={() => {
        if (format != value) {
          setValue(format);
          props.onChange({ target: { value: format } });
        }
      }}
    >
      {format}
    </FormatButton>
  ));

  return (
    <div className={styles.formatSelect} >
      {formatButtons}
    </div>
  );
}
