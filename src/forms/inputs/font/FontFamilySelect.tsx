import * as React from 'react';
import Select from 'react-select';
import { availableFontFamilies } from './availableFontFamilies';

type Option = {
  value: string;
  label: string;
}

function isOption(v: any): v is Option {
  return (
    typeof v == 'object'
    && v != null
    && typeof v.value == 'string'
    && typeof v.label == 'string'
  );
}

function toOption(value: string): Option {
  return { value: value, label: value };
}

export type ChangeEvent = {
  target: {
    value: string;
  }
}

export type Props = {
  value?: string;
  onChange: (event: ChangeEvent) => void;
  styles?: {
    container?: {
      minWidth?: string;
    }
  }
}

export function FontFamilySelect(props: Props) {
  return (
    <Select
      defaultValue={typeof props.value == 'string' ? toOption(props.value) : undefined}
      options={availableFontFamilies().filter(ff => ff != props.value).map(ff => toOption(ff))}
      placeholder=''
      isMulti={false}
      isClearable={false}
      isSearchable={false}
      onChange={newValue => {
        if (isOption(newValue)) {
          // give the select component time to rerender before possibly being unmounted
          // by the change event callback (otherwise, React might complain about memory
          // leaks)
          setTimeout(
            () => props.onChange({ target: { value: newValue.value } }),
            250,
          );
        }
      }}
      styles={{
        container: provided => ({
          ...provided,
          minWidth: props.styles?.container?.minWidth ?? '232px',
          fontFamily: 'Open Sans',
          fontSize: '12px',
        }),
        control: (provided, state) => ({
          ...provided,
          boxSizing: 'border-box',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: state.isFocused ? 'rgba(0,0,0,0.95)' : 'rgb(184, 184, 203)',
          borderRadius: '2px',
          padding: '6px 0px',
          minHeight: '0px',
          boxShadow: 'none',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'rgba(0,0,0,0.95)',
          },
        }),
        valueContainer: provided => ({
          ...provided,
          padding: '0px',
          overflow: 'visible',
        }),
        indicatorsContainer: provided => ({
          ...provided,
          display: 'none',
        }),
        menu: provided => ({
          ...provided,
          margin: '4px 0px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: 'white',
          fontFamily: state.data.value,
          fontSize: '12px',
          color: 'black',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.075)',
          },
        }),
        singleValue: (provided, state) => ({
          ...provided,
          marginLeft: '8px',
          marginRight: '8px',
          fontFamily: state.data.value,
          fontSize: '12px',
          color: 'black',
          overflow: 'visible',
        }),
      }}
    />
  );
}
