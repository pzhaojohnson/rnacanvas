import * as React from 'react';
import { TextInput } from 'Forms/inputs/text/TextInput';
import { FieldDescription } from 'Forms/inputs/labels/FieldDescription';

export type Props = {
  value: string;

  // called on blur and pressing the Enter key
  onSubmit: (event: { target: { value: string } }) => void;
};

export class MotifInput extends React.Component<Props> {
  state: {
    value: string;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <TextInput
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
          onBlur={() => this.submit()}
          onKeyUp={event => {
            if (event.key.toLowerCase() == 'enter') {
              this.submit();
            }
          }}
          spellCheck={false}
          style={{ width: 'auto' }} // allow element to stretch
        />
        <FieldDescription style={{ margin: '7px 0 0 16px' }} >
          ...a motif to search for "CUGCCA"
        </FieldDescription>
      </div>
    );
  }

  submit() {
    let value = this.state.value.trim();
    this.setState({ value });
    this.props.onSubmit({ target: { value } });
  }
}
