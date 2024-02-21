import * as SVG from '@svgdotjs/svg.js';

import { ValuesWrapper } from 'Values/ValuesWrapper';

import { isNullish } from '@rnacanvas/value-check';
import { isBlank } from 'Parse/isBlank';
import { strokeDasharrayValueEqualsNone as equalsNone } from 'Values/svg/strokeDasharrayValueEqualsNone';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';
import type { CSSProperties } from 'Forms/inputs/text/TextInput';

function isNotBlank(s: string): boolean {
  return !isBlank(s);
}

function isPositive(n: number): boolean {
  return n > 0;
}

/**
 * A value that the stroke-dasharray attribute of an SVG element can
 * have.
 */
export type StrokeDasharrayValue = unknown;

/**
 * A value that the stroke-dasharray attribute of an SVG element can
 * have that is a string.
 */
export type StringStrokeDasharrayValue = string;

export type EditEvent = {
  /**
   * The new value that was or will be assigned to the stroke-dasharray
   * attributes of the SVG elements.
   */
  newValue: StringStrokeDasharrayValue;

  /**
   * The previous value that the stroke-dasharray attributes of the SVG
   * elements shared.
   *
   * Is undefined if not all SVG elements had the same stroke-dasharray
   * value.
   */
  oldValue?: StrokeDasharrayValue;
};

export type Props = {
  id?: string;

  /**
   * The SVG elements to edit.
   */
  elements?: SVG.Element[];

  /**
   * Called immediately after changing the stroke-dasharray attributes
   * of the SVG elements.
   */
  onEdit?: (event: EditEvent) => void;

  /**
   * Called immediately before changing the stroke-dasharray attributes
   * of the SVG elements.
   */
  onBeforeEdit?: (event: EditEvent) => void;

  style?: CSSProperties;
};

/**
 * Allows editing of the stroke-dasharray attributes of the provided SVG
 * elements.
 */
export class StrokeDasharrayInput extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  /**
   * The value that the stroke-dasharray attributes of the SVG elements
   * currently share.
   *
   * Is undefined if not all SVG elements have the same value for their
   * stroke-dasharray attribute.
   */
  get oldValue(): StrokeDasharrayValue | undefined {
    if (!this.props.elements || this.props.elements.length == 0) {
      return undefined;
    }

    let values = new ValuesWrapper<unknown>(
      this.props.elements.map(ele => ele.attr('stroke-dasharray'))
    );

    let commonValue = values.commonValue;
    return !isNullish(commonValue) ? commonValue : undefined;
  }

  /**
   * The value that the underlying text input component is initially
   * rendered with.
   */
  get initialValue(): string {
    let oldValue = this.oldValue;
    return !isNullish(oldValue) ? String(oldValue) : '';
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  /**
   * The value that the stroke-dasharray attributes of the SVG elements
   * are to be set to based on the current value of the underlying text
   * input component.
   */
  get newValue(): string {
    // split by whitespace and commas
    let dashStrings = this.state.value.split(/[\s|,]/);
    dashStrings = dashStrings.filter(isNotBlank);

    let dashes = dashStrings.map(Number.parseFloat);
    dashes = dashes.filter(Number.isFinite);
    dashes = dashes.filter(isPositive);

    return dashes.join(' ');
  }

  submit() {
    let newValue = this.newValue;
    let oldValue = this.oldValue;

    try {
      if (!this.props.elements || this.props.elements.length == 0) {
        throw new Error();
      } else if (newValue == oldValue) {
        throw new Error();
      } else if (equalsNone(newValue)) {
        throw new Error();
      }
    } catch {
      this.setState({ value: this.initialValue });
      return; // don't edit the SVG elements
    }

    // edit the SVG elements
    let editEvent = { newValue, oldValue };
    if (this.props.onBeforeEdit) {
      this.props.onBeforeEdit(editEvent);
    }
    this.props.elements.forEach(ele => {
      ele.attr('stroke-dasharray', newValue);
    });
    if (this.props.onEdit) {
      this.props.onEdit(editEvent);
    }
  }

  render() {
    return (
      <TextInput
        id={this.props.id}
        value={this.state.value}
        onChange={event => this.handleChange(event)}
        onBlur={() => this.submit()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        spellCheck={false}
        style={{
          minWidth: '44px',
          ...this.props.style,
        }}
      />
    );
  }
}
