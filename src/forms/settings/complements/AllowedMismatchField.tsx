import type { App } from 'App';
import type { BindingTool } from 'Draw/interact/bind/BindingTool';

import * as React from 'react';
import { TextInputField } from 'Forms/inputs/text/TextInputField';

import { round } from 'Math/round';
import { isBlank } from 'Parse/isBlank';

class BindingToolWrapper {
  readonly bindingTool: BindingTool;

  constructor(bindingTool: BindingTool) {
    this.bindingTool = bindingTool;
  }

  /**
   * The allowed mismatch complements option of the binding tool.
   * (Converts an undefined value to a value of zero.)
   */
  get allowedMismatch(): number {
    return this.bindingTool.complementsOptions.allowedMismatch ?? 0;
  }

  set allowedMismatch(proportion: number) {
    this.bindingTool.complementsOptions.allowedMismatch = proportion;
  }
}

class AppWrapper {
  readonly app: App;

  constructor(app: App) {
    this.app = app;
  }

  /**
   * The binding tool of the app.
   */
  get bindingTool(): BindingToolWrapper {
    return new BindingToolWrapper(this.app.drawingInteraction.bindingTool);
  }

  refresh() {
    this.app.refresh();
  }
}

export type Props = {
  app: App;
}

type State = {
  value: string; // a percentage string
}

export class AllowedMismatchField extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get initialValue(): string {
    let app = new AppWrapper(this.props.app);

    let proportion = app.bindingTool.allowedMismatch;
    let percentage = 100 * proportion;
    percentage = round(percentage, 0);

    return percentage + '%';
  }

  render() {
    return (
      <TextInputField
        label='Mismatch Allowed'
        value={this.state.value}
        onChange={event => this.setState({ value: event.target.value })}
        onBlur={() => this.processValue()}
        onKeyUp={event => {
          if (event.key.toLowerCase() == 'enter') {
            this.processValue();
          }
        }}
        input={{ spellCheck: false, style: { minWidth: '32px' } }}
        style={{ alignSelf: 'start' }}
      />
    );
  }

  processValue() {
    let app = new AppWrapper(this.props.app);

    try {
      if (isBlank(this.state.value)) {
        throw new Error();
      }

      let percentage = Number.parseFloat(this.state.value);

      if (!Number.isFinite(percentage)) {
        throw new Error();
      }

      let proportion = percentage / 100;
      proportion = round(proportion, 2); // removes any floating point imprecision

      if (proportion == app.bindingTool.allowedMismatch) {
        throw new Error();
      }

      // clamp proportion
      if (proportion < 0) {
        proportion = 0;
      } else if (proportion > 1) {
        proportion = 1;
      }

      // set the value
      app.bindingTool.allowedMismatch = proportion;
      app.refresh();
    } catch {
      this.setState({ value: this.initialValue });
    }
  }
}
