import { StrokeLinecapValue } from 'Forms/inputs/svg/strokeLinecap/strokeLinecap';

import * as React from 'react';
import { useState } from 'react';
import styles from './StrokeLinecapField.css';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

type Option = {
  value: StrokeLinecapValue;
  title: string;
  textContent: string;
};

let options: Option[] = [
  {
    value: 'butt',
    title: 'No line caps.',
    textContent: 'None',
  },
  {
    value: 'round',
    title: 'Round line caps.',
    textContent: '',
  },
  {
    value: 'square',
    title: 'Square line caps.',
    textContent: '',
  },
];

type OptionButtonProps = {
  option: Option;
  isToggled: boolean;
  onClick: () => void;
};

function OptionButton(props: OptionButtonProps) {
  let isButtButton = props.option.value == 'butt';
  let isRoundButton = props.option.value == 'round';
  let isSquareButton = props.option.value == 'square';

  return (
    <p
      className={`
        ${styles.optionButton}
        ${props.isToggled ? styles.toggledOptionButton : styles.untoggledOptionButton}
        ${isButtButton ? styles.buttButton : ''}
        ${isRoundButton ? styles.roundButton : ''}
        ${isSquareButton ? styles.squareButton : ''}
      `}
      title={props.option.title}
      onClick={props.onClick}
    >
      {props.option.textContent}
    </p>
  );
}

export type ChangeEvent = {
  target: {
    value: StrokeLinecapValue,
  },
};

export type StrokeLinecapSelectProps = {
  value?: unknown;
  onChange: (event: ChangeEvent) => void;
};

export function StrokeLinecapSelect(props: StrokeLinecapSelectProps) {
  let [value, setValue] = useState(props.value);
  return (
    <div className={styles.strokeLinecapSelect} >
      {options.map((option, i) => (
        <OptionButton
          key={i}
          option={option}
          isToggled={option.value == value}
          onClick={() => {
            setValue(option.value);
            props.onChange({ target: { value: option.value } });
          }}
        />
      ))}
    </div>
  );
}

export type StrokeLinecapFieldProps = (
  StrokeLinecapSelectProps
  & { style?: React.CSSProperties }
);

export function StrokeLinecapField(props: StrokeLinecapFieldProps) {
  return (
    <div className={styles.strokeLinecapField} style={props.style} >
      <StrokeLinecapSelect {...props} />
      <FieldLabel style={{ marginLeft: '8px' }} >
        Line Caps
      </FieldLabel>
    </div>
  );
}
