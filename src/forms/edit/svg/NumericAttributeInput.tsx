import * as SVG from '@svgdotjs/svg.js';
import { SVGElementsWrapper } from 'Draw/svg/SVGElementsWrapper';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';
import type { CSSProperties } from 'Forms/inputs/text/TextInput';

import { isNullish } from '@rnacanvas/value-check';
import { isBlank } from 'Parse/isBlank';

export type NumericAttributeName = (
  'stroke-width'
  | 'width'
  | 'height'
  | 'r'
  | 'font-size'
);

export type Nullish = null | undefined;

export type EditEvent = {
  /**
   * The new value that the numeric attribute was or will be set to.
   */
  newValue: number;

  /**
   * The previous value of the numeric attribute for the elements.
   *
   * Is nullish if not all elements had the same value for the numeric
   * attribute.
   */
  oldValue: number | Nullish;
};

export type Props = {
  id?: string;

  /**
   * The elements to edit.
   */
  elements?: SVG.Element[];

  /**
   * The name of the numeric attribute to edit.
   */
  attributeName?: NumericAttributeName;

  /**
   * The number of decimal places of precision to use.
   */
  places?: number;

  /**
   * The range of values to constrain values input by the user to.
   */
  minValue?: number;
  maxValue?: number;

  /**
   * Called immediately after editing the elements.
   */
  onEdit?: (event: EditEvent) => void;

  /**
   * Called immediately before editing the elements.
   */
  onBeforeEdit?: (event: EditEvent) => void;

  style?: CSSProperties;
};

export class NumericAttributeInput extends React.Component<Props> {
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
   * The current value of the numeric attribute for the elements.
   *
   * Is nullish if not all elements have the same value for the numeric
   * attribute.
   */
  get oldValue() {
    if (!this.props.elements || !this.props.attributeName) {
      return undefined;
    }

    let eles = new SVGElementsWrapper(this.props.elements);
    let places = this.props.places;
    return eles.getNumericAttribute(this.props.attributeName, { places });
  }

  /**
   * The initial string value of the text input when first rendered.
   */
  get initialValue(): string {
    let oldValue = this.oldValue;

    if (isNullish(oldValue)) {
      return '';
    } else {
      return oldValue.toString();
    }
  }

  render() {
    return (
      <TextInput
        id={this.props.id}
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.submit()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        spellCheck={false}
        style={{
          minWidth: '49px',
          ...this.props.style,
        }}
      />
    );
  }

  submit() {
    let newValue = Number.parseFloat(this.state.value);

    let minValue = this.props.minValue ?? -Infinity;
    let maxValue = this.props.maxValue ?? Infinity;
    newValue = Math.max(newValue, minValue);
    newValue = Math.min(newValue, maxValue);

    let oldValue = this.oldValue;

    try {
      if (!this.props.elements || !this.props.attributeName) {
        throw new Error();
      } else if (isBlank(this.state.value)) {
        throw new Error();
      } else if (!Number.isFinite(newValue)) {
        throw new Error();
      } else if (newValue == oldValue) {
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
    let attributeName = this.props.attributeName;
    this.props.elements.forEach(ele => {
      ele.attr(attributeName, newValue);
    });
    if (this.props.onEdit) {
      this.props.onEdit(editEvent);
    }
  }
}
