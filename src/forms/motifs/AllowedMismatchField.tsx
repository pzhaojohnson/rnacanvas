import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';
import { round } from 'Math/round';

function percentageString(proportion: number): string {
  return round(100 * proportion, 0) + '%';
}

export type Props = {
  value: number; // the allowed mismatch proportion

  // called on blur and pressing the Enter key
  onSubmit: (event: { target: { value: number } }) => void;
};

export class AllowedMismatchField extends React.Component<Props> {
  state: {
    value: string; // the allowed mismatch percentage string
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: percentageString(props.value),
    };
  }

  render() {
    return (
      <TextInputField
        label='Mismatch Allowed'
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.submit()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        input={{
          spellCheck: false,
          style: { minWidth: '5ch', textAlign: 'end' },
        }}
        style={{ margin: '8px 0 0 0', alignSelf: 'start' }}
      />
    );
  }

  submit() {
    let proportion = Number.parseFloat(this.state.value) / 100;
    proportion = round(proportion, 2);
    if (!Number.isFinite(proportion)) {
      proportion = 0;
    } else if (proportion < 0) {
      proportion = 0;
    } else if (proportion > 1) {
      proportion = 1;
    }
    this.setState({ value: percentageString(proportion) });
    this.props.onSubmit({ target: { value: proportion } });
  }
}
