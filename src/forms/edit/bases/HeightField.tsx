import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';
import type { App } from 'App';
import { round } from 'Math/round';

export type Props = {
  app: App;
}

type Value = string;

type State = {
  value: Value;
}

function isBlank(v: Value): boolean {
  return v.trim().length == 0;
}

function constrainHeight(h: number): number {
  if (!Number.isFinite(h)) {
    return 13.5;
  } else if (h < 0) {
    return 0;
  } else {
    return h;
  }
}

export class HeightField extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.app.strictDrawing.baseHeight.toString(),
    }
  }

  render() {
    return (
      <TextInputField
        label='Height'
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => {
          this.submit();
          this.props.app.refresh();
        }}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
            this.props.app.refresh();
          }
        }}
        input={{
          style: { width: '32px' },
        }}
        style={{ margin: '10px 0 0 10px', alignSelf: 'start' }}
      />
    );
  }

  submit() {
    if (!isBlank(this.state.value)) {
      let h = Number.parseFloat(this.state.value);
      if (Number.isFinite(h)) {
        if (h != this.props.app.strictDrawing.baseHeight) {
          this.props.app.pushUndo();
          h = constrainHeight(h);
          h = round(h, 2);
          this.props.app.strictDrawing.baseHeight = h;
          this.props.app.strictDrawing.updateLayout();
          this.props.app.refresh();
        }
      }
    }
  }
}
