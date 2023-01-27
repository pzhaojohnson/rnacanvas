import type { App } from 'App';
import type { BindingTool } from 'Draw/interact/bind/BindingTool';

import * as React from 'react';
import { TextInput } from 'Forms/inputs/text/TextInput';
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

import { round } from 'Math/round';
import { isBlank } from 'Parse/isBlank';

class BindingToolWrapper {
  readonly bindingTool: BindingTool;

  constructor(bindingTool: BindingTool) {
    this.bindingTool = bindingTool;
  }

  /**
   * The allowed GUT complements option of the binding tool.
   * (Converts an undefined value to a value of zero.)
   */
  get allowedGUT(): number {
    return this.bindingTool.complementsOptions.allowedGUT ?? 0;
  }

  set allowedGUT(proportion: number) {
    this.bindingTool.complementsOptions.allowedGUT = proportion;
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
  app: App; // a reference to the whole app
}

export class AllowedGUTField extends React.Component<Props> {
  state: {
    value: string; // a percentage string
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.initialValue,
    };
  }

  get initialValue(): string {
    let app = new AppWrapper(this.props.app);

    let percentage = 100 * app.bindingTool.allowedGUT;
    percentage = round(percentage, 0);

    return percentage + '%';
  }

  render() {
    let app = new AppWrapper(this.props.app);

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
        <input
          type='checkbox'
          id='AllowedGUTCheckbox'
          checked={app.bindingTool.allowedGUT > 0}
          onChange={event => {
            app.bindingTool.allowedGUT = event.target.checked ? 1 : 0;
            app.refresh();
          }}
        />
        {app.bindingTool.allowedGUT <= 0 ? null : (
          <TextInput
            id='AllowedGUTPercentageInput'
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            onBlur={() => this.processValue()}
            onKeyUp={event => {
              if (event.key.toLowerCase() == 'enter') {
                this.processValue();
              }
            }}
            spellCheck={false}
            style={{ marginLeft: '8px', minWidth: '32px' }}
          />
        )}
        <FieldLabel
          htmlFor={app.bindingTool.allowedGUT <= 0 ? 'AllowedGUTCheckbox' : 'AllowedGUTPercentageInput' }
          style={{
            paddingLeft: app.bindingTool.allowedGUT <= 0 ? '6px' : '8px',
            cursor: app.bindingTool.allowedGUT <= 0 ? 'pointer' : 'text',
          }}
        >
          {app.bindingTool.allowedGUT <= 0 ? 'Include GU and GT Pairs' : 'GU and GT Pairs Allowed'}
        </FieldLabel>
      </div>
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

      if (proportion == app.bindingTool.allowedGUT) {
        throw new Error();
      }

      // clamp proportion
      if (proportion < 0) {
        proportion = 0;
      } else if (proportion > 1) {
        proportion = 1;
      }

      app.bindingTool.allowedGUT = proportion;
      app.refresh();
    } catch {
      this.setState({ value: this.initialValue });
    }
  }
}
