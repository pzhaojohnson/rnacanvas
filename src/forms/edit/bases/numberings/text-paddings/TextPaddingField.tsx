import * as React from 'react';

import { TextInput } from 'Forms/inputs/text/TextInput';

import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

// should be stable across mountings and unmountings
// (to allow refocusing of the input element when the app is refreshed)
const textInputId = generateHTMLCompatibleUUID();

export interface ValueToDisplayDeterminer {
  /**
   * Returns the initial value to display to the user.
   */
  determine(): string;
}

export interface ShouldSetDecider {
  /**
   * Returns true if should set the text paddings to the given
   * submitted value and returns false otherwise.
   */
  shouldSetTo(value: number): boolean;
}

export interface TextPaddingsSetter {
  /**
   * Sets the text paddings of the subject base numberings to the
   * provided value.
   */
  set(value: number): void;
}

export type Props = {
  valueToDisplayDeterminer: ValueToDisplayDeterminer;

  shouldSetDecider: ShouldSetDecider;

  textPaddingsSetter: TextPaddingsSetter;
};

type State = {
  value: string;
};

export class TextPaddingField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.valueToDisplayDeterminer.determine(),
    };
  }

  render() {
    let style: React.CSSProperties = {
      marginTop: '9px',
      alignSelf: 'start',
      cursor: 'text',
    };

    return (
      <FieldLabel style={style} >
        <TextInput
          id={textInputId}
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
          style={{ minWidth: '49px' }}
        />
        <span style={{ paddingLeft: '8px' }} >
          Text Padding
        </span>
      </FieldLabel>
    );
  }

  submit() {
    let value = Number.parseFloat(this.state.value);

    if (this.props.shouldSetDecider.shouldSetTo(value)) {
      this.props.textPaddingsSetter.set(value);
    } else {
      this.reject();
    }
  }

  /**
   * Rejects what has been input by the user.
   *
   * (Resets the displayed value.)
   */
  reject() {
    this.setState({
      value: this.props.valueToDisplayDeterminer.determine(),
    });
  }
}
