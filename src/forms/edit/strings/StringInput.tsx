import * as React from 'react';

/**
 * Already has CSS styles fitting in with the aesthetics of the app.
 */
import { TextInput as BasicTextInput } from 'Forms/inputs/text/TextInput';

import { CSSProperties } from 'Forms/inputs/text/TextInput';

export interface InitialValueProvider {
  /**
   * Returns an initial value for the string input component to be
   * shown when first rendered.
   *
   * The returned value should convey to the user the current value
   * of the subject string value for the string input component.
   */
  provide(): string;
}

export interface SubmittedValueRefiner {
  /**
   * Given a value submitted by the user, this method returns a refined
   * version of it (such as with leading and trailing whitespace
   * trimmed).
   *
   * This method is called right after the user submits a value and
   * before the submitted value is processed further.
   *
   * Is meant to give an opportunity to refine a bit the value
   * submitted by the user.
   */
  refine(submittedValue: string): string;
}

export interface ShouldSetDecider {
  /**
   * Is passed a value submitted by the user and refined by the
   * refiner.
   *
   * Returns true if the subject string value of the string input
   * component should be set to the given value and returns false
   * otherwise.
   */
  shouldSetTo(refinedSubmittedValue: string): boolean;
}

export interface Setter {
  /**
   * Sets the subject string value of the string input component to
   * the given value.
   *
   * Is passed the same value that was provided to the should-set
   * decider immediately prior
   *
   * Is only called if the should-set decider says so.
   */
  setTo(refinedSubmittedValue: string): void;
}

export type Props = {
  initialValueProvider: InitialValueProvider;

  submittedValueRefiner: SubmittedValueRefiner;

  shouldSetDecider: ShouldSetDecider;

  setter: Setter;

  id?: string;

  style?: CSSProperties;
};

/**
 * A text input element for controlling a string value in the app.
 */
export class StringInput extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValueProvider.provide(),
    };
  }

  render() {
    return (
      <BasicTextInput
        value={this.state.value}
        onChange={event => {
          this.setState({ value: event.target.value });
        }}
        onBlur={() => {
          this.submit();
        }}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        id={this.props.id}
        style={this.props.style}
      />
    );
  }

  submit() {
    let submittedValue = this.state.value;

    let refiner = this.props.submittedValueRefiner;
    let refinedSubmittedValue = refiner.refine(submittedValue);

    if (this.props.shouldSetDecider.shouldSetTo(refinedSubmittedValue)) {
      this.props.setter.setTo(refinedSubmittedValue);
    } else {
      this.resetValue();
    }
  }

  resetValue() {
    // requery to get the most up-to-date value
    let value = this.props.initialValueProvider.provide();

    this.setState({ value });
  }
}
