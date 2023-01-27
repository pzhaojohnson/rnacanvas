import * as SVG from '@svgdotjs/svg.js';
import { SVGElementsWrapper } from 'Draw/svg/SVGElementsWrapper';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';
import type { CSSProperties } from 'Forms/inputs/text/TextInput';

import { isNullish } from 'Values/isNullish';
import { round } from 'Math/round';
import { isBlank } from 'Parse/isBlank';

export type OpacityAttributeName = (
  'opacity'
  | 'fill-opacity'
  | 'stroke-opacity'
);

export type Nullish = null | undefined;

export type EditEvent = {
  /**
   * The new value that the opacity attribute was or will be set to.
   */
  newValue: number;

  /**
   * The previous value for the opacity attribute.
   */
  oldValue: number | Nullish;
};

export { CSSProperties };

export type Props = {
  id?: string;

  /**
   * The elements to edit.
   */
  elements?: SVG.Element[];

  /**
   * The name of the opacity attribute to set.
   */
  attributeName?: OpacityAttributeName;

  /**
   * The number of decimal places of precision to use when processing
   * opacity values.
   *
   * (Used when processing the actual opacity values, not the displayed
   * percentage values. Setting this to two would correspond with zero
   * decimal places being shown in displayed percentage values.)
   *
   * Defaults to two.
   */
  places?: number;

  /**
   * Called immediately after changing the opacity attributes of the
   * elements.
   */
  onEdit?: (event: EditEvent) => void;

  /**
   * Called immediately before changing the opacity attributes of the
   * elements.
   */
  onBeforeEdit?: (event: EditEvent) => void;

  style?: CSSProperties;
};

export class OpacityAttributeInput extends React.Component<Props> {
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
   * The number of decimal places of precision to use when processing
   * opacity values.
   *
   * Is two by default.
   */
  get places(): number {
    return this.props.places ?? 2;
  }

  /**
   * The number of decimal places of precision used when presenting
   * opacity values as percentages (i.e., two less than the number of
   * decimal places used when processing opacity values).
   *
   * Is zero when the number of decimal places used to process opacity
   * values is less than two (i.e., is not allowed to be negative).
   */
  get percentagePlaces(): number {
    // prevent from being negative
    return Math.max(this.places - 2, 0);
  }

  /**
   * The current value of the opacity attribute for the elements.
   *
   * Is nullish if not all elements have the same value for their
   * opacity attributes.
   */
  get oldValue() {
    if (!this.props.elements || !this.props.attributeName) {
      return undefined;
    }

    let eles = new SVGElementsWrapper(this.props.elements);
    let places = this.places;
    return eles.getNumericAttribute(this.props.attributeName, { places });
  }

  /**
   * The displayed percentage string for the current value of the
   * opacity attribute for the elements.
   *
   * Is just a percentage sign if the elements do not all have the same
   * value for their opacity attributes.
   */
  get initialValue(): string {
    let oldValue = this.oldValue;

    if (isNullish(oldValue)) {
      return '%';
    } else {
      let percentage = 100 * oldValue;
      percentage = round(percentage, this.percentagePlaces);
      return percentage + '%';
    }
  }

  render() {
    // hard coded to match the width of a value of "100%"
    let minWidth = '31px';

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
          minWidth,
          ...this.props.style,
        }}
      />
    );
  }

  submit() {
    let newValue = Number.parseFloat(this.state.value);
    newValue /= 100;
    newValue = Math.max(newValue, 0); // cannot be negative
    newValue = Math.min(newValue, 1); // cannot be more than 1

    let oldValue = this.oldValue;

    try {
      if (!this.props.elements || this.props.elements.length == 0) {
        throw new Error();
      } else if (!this.props.attributeName) {
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
