import * as React from 'react';
import textFieldStyles from 'Forms/fields/text/TextField.css';
import { AppInterface as App } from 'AppInterface';
import { SequenceInterface as Sequence } from 'Draw/sequences/SequenceInterface';
import { orientBaseNumberings } from 'Draw/bases/number/orient';

export type Props = {
  app: App;

  // the sequence to edit
  sequence: Sequence;
}

type Value = string;

type State = {
  value: Value;
}

function isBlank(v: Value): boolean {
  return v.trim().length == 0;
}

function constrainNumberingAnchor(na: number): number {
  if (!Number.isFinite(na)) {
    return 0;
  } else {
    return Math.floor(na);
  }
}

export class NumberingAnchorInput extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    let na = props.sequence.numberingAnchor;
    let no = props.sequence.numberingOffset;

    this.state = {
      value: (na + no).toString(),
    };
  }

  render() {
    return (
      <input
        type='text'
        className={textFieldStyles.input}
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
        style={{ width: '32px' }}
      />
    );
  }

  submit() {
    if (!isBlank(this.state.value)) {
      let na = Number.parseFloat(this.state.value);
      if (Number.isFinite(na)) {
        na -= this.props.sequence.numberingOffset;
        if (na != this.props.sequence.numberingAnchor) {
          this.props.app.pushUndo();
          na = constrainNumberingAnchor(na);
          this.props.sequence.numberingAnchor = na;
          orientBaseNumberings(this.props.app.strictDrawing.drawing);
          this.props.app.refresh();
        }
      }
    }
  }
}
