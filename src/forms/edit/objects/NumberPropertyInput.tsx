import { ObjectsWrapper } from 'Values/ObjectsWrapper';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';

import { isNullish } from 'Values/isNullish';
import { isBlank } from 'Parse/isBlank';

export type Nullish = null | undefined;

export type EditEvent = {
  /**
   * The new value that the number property was or will be set to.
   */
  newValue: number;

  /**
   * The previous value of the number property.
   *
   * Is nullish if not all objects had the same value for the number
   * property.
   */
  oldValue: number | Nullish;
};

export type Props = {
  /**
   * The objects to edit.
   */
  objects: { [key: string]: unknown }[];

  /**
   * The name of the number property to edit.
   */
  propertyName?: string;

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
   * Called immediately after editing the objects.
   */
  onEdit?: (event: EditEvent) => void;

  /**
   * Called immediately before editing the objects.
   */
  onBeforeEdit?: (event: EditEvent) => void;

  style?: React.CSSProperties;
};

/**
 * Note that this component does not type check the specified property
 * (to confirm that it actually is a number property) when setting it.
 */
export class NumberPropertyInput extends React.Component<Props> {
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
   * The current value of the number property for the objects.
   *
   * Is nullish if not all objects have the same value for the number
   * property.
   */
  get oldValue() {
    if (!this.props.objects || !this.props.propertyName) {
      return undefined;
    }

    let objs = new ObjectsWrapper(this.props.objects);
    let places = this.props.places;
    return objs.getNumberProperty(this.props.propertyName, { places });
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
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.processValue()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.processValue();
          }
        }}
        style={this.props.style}
      />
    );
  }

  processValue() {
    if (!this.props.objects || !this.props.propertyName) {
      return;
    } else if (isBlank(this.state.value)) {
      return;
    }

    let newValue = Number.parseFloat(this.state.value);
    let oldValue = this.oldValue;

    if (!Number.isFinite(newValue)) {
      return;
    } else if (newValue == oldValue) {
      return;
    }

    let minValue = this.props.minValue ?? -Infinity;
    let maxValue = this.props.maxValue ?? Infinity;
    newValue = Math.max(newValue, minValue);
    newValue = Math.min(newValue, maxValue);

    let editEvent = { newValue, oldValue };
    if (this.props.onBeforeEdit) {
      this.props.onBeforeEdit(editEvent);
    }
    let propertyName = this.props.propertyName;
    this.props.objects.forEach(obj => {
      obj[propertyName] = newValue;
    });
    if (this.props.onEdit) {
      this.props.onEdit(editEvent);
    }
  }
}