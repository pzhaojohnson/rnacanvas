import { AnglesWrapper } from 'Values/AnglesWrapper';

import { normalizeAngle } from 'Math/angles/normalizeAngle';
import { round } from 'Math/round';

import { radiansToDegrees } from 'Math/angles/degrees'
import { degreesToRadians } from 'Math/angles/degrees';

import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';
import type { CSSProperties } from 'Forms/inputs/text/TextInput';

import { isNumber } from 'Values/isNumber';
import { isNullish } from '@rnacanvas/value-check';

const degreeCharacter = '\xB0';

export type Nullish = null | undefined;

export type EditEvent = {
  /**
   * The new value that the object property was or will be set to.
   */
  newValue: number;

  /**
   * The previous value of the object property.
   *
   * Is nullish if not every object had the same value for the property.
   */
  oldValue: number | Nullish;
};

export type Props = {
  id?: string;

  /**
   * The objects to edit.
   */
  objects?: { [key: string]: unknown }[];

  /**
   * The name of the object property to edit.
   */
  propertyName?: string;

  /**
   * The number of decimal places of precision to use when processing
   * angles in radians.
   *
   * Is two by default.
   */
  places?: number;

  /**
   * The angle floor to use when normalizing angles in radians.
   *
   * Is zero by default.
   */
  angleFloor?: number;

  /**
   * The number of decimal places to show when displaying angles to the
   * user. (Angles are displayed in degrees.)
   *
   * Is zero by default.
   */
  displayedPlaces?: number;

  /**
   * Called immediately after changing the object property.
   */
  onEdit?: (event: EditEvent) => void;

  /**
   * Called immediately before changing the object property.
   */
  onBeforeEdit?: (event: EditEvent) => void;

  style?: CSSProperties;
};

/**
 * Allows editing of an object property that holds a direction angle.
 *
 * (Two direction angles are considered equivalent so long as the
 * difference between them is a multiple of 2 * Math.PI.)
 *
 * Note that this component does not type check the object property (to
 * confirm that it actually holds a number value) when setting it.
 */
export class DirectionAnglePropertyInput extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get angleFloor(): number {
    return this.props.angleFloor ?? 0;
  }

  get places(): number {
    return this.props.places ?? 2;
  }

  get displayedPlaces(): number {
    return this.props.displayedPlaces ?? 0;
  }

  get oldValue(): number | Nullish {
    if (!this.props.objects || !this.props.propertyName) {
      return undefined;
    }

    let propertyName = this.props.propertyName;

    let angles = new AnglesWrapper(
      this.props.objects.map(obj => {
        let value = obj[propertyName];
        return isNumber(value) ? value : null;
      })
    );

    angles = angles.normalize({ angleFloor: this.angleFloor });
    angles = angles.round({ places: this.places });
    return angles.commonValue;
  }

  get initialValue(): string {
    let oldValue = this.oldValue;

    if (isNullish(oldValue)) {
      return '';
    } else {
      let degrees = radiansToDegrees(oldValue);
      degrees = round(degrees, this.displayedPlaces);
      return degrees.toString() + degreeCharacter;
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
    let degrees = Number.parseFloat(this.state.value);
    let newValue = degreesToRadians(degrees);
    let oldValue = this.oldValue;
    let values = new AnglesWrapper([newValue, oldValue]);

    // trying to normalize a nonfinite angle might loop infinitely
    if (Number.isFinite(newValue) && Number.isFinite(oldValue)) {
      newValue = normalizeAngle(newValue, this.angleFloor);
      values = values.normalize({ angleFloor: this.angleFloor });
    }

    // necessary after normalizing calculations floating point errors
    values = values.round({ places: this.places });

    try {
      if (!this.props.objects || this.props.objects.length == 0) {
        throw new Error();
      } else if (!this.props.propertyName) {
        throw new Error();
      } else if (!Number.isFinite(newValue)) {
        throw new Error();
      } else if (!isNullish(values.commonValue)) {
        throw new Error(); // new and old values are the same
      }
    } catch {
      this.setState({ value: this.initialValue });
      return; // don't edit the objects
    }

    // edit the objects
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
