import * as React from 'react';

/**
 * Already has CSS styles to fit in the aesthetics of the app.
 */
import { FieldLabel } from 'Forms/inputs/labels/FieldLabel';

export type Props = {
  /**
   * A string input element component.
   */
  stringInput: React.ReactNode;

  /**
   * What to label the string input element with.
   */
  label: string;

  style?: React.CSSProperties;
};

/**
 * A labeled string input.
 */
export class StringInputField extends React.Component<Props> {
  render() {
    return (
      <FieldLabel style={this.props.style} >
        {this.props.stringInput}
        <span style={{ paddingLeft: '8px', cursor: 'text' }} >
          {this.props.label}
        </span>
      </FieldLabel>
    );
  }
}
