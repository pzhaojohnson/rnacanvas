import type { App } from 'App';

import * as React from 'react';
import styles from './DrawingTitleInput.css';

import { generateHTMLCompatibleUUID } from 'Utilities/generateHTMLCompatibleUUID';

import { isBlank } from 'Parse/isBlank';
import { isNullish } from '@rnacanvas/value-check';

// keep stable to help with refocusing the input element on app refresh
const id = generateHTMLCompatibleUUID();

export type Props = {
  /**
   * A reference to the whole app.
   */
  app: App;
}

type State = {
  value: string;
}

export class DrawingTitleInput extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get initialValue(): string {
    return this.props.app.drawingTitle.value;
  }

  render() {
    return (
      <input
        type='text'
        id={id}
        className={styles.drawingTitleInput}
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.submit()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.submit();
          }
        }}
        spellCheck={false}
      />
    );
  }

  submit() {
    let app = this.props.app;

    let value = this.state.value;
    value = value.trim(); // remove leading and trailing whitespace

    try {
      if (isBlank(value) && isNullish(app.drawingTitle.specifiedValue)) {
        throw new Error(); // drawing title is already unspecified
      } else if (isBlank(value)) {
        app.drawingTitle.unspecify();
      } else if (value == app.drawingTitle.value) {
        throw new Error(); // drawing title already equals value
      } else {
        app.drawingTitle.value = value;
      }

      this.props.app.refresh(); // the drawing title was changed
    } catch {
      this.setState({ value: this.initialValue });
    }
  }
}
