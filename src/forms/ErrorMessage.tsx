import * as React from 'react';
import styles from './ErrorMessage.css';

interface Props {
  message?: string;

  // message may also be specified through child elements
  children?: React.ReactNode;

  style?: React.CSSProperties;
}

export class ErrorMessage extends React.Component<Props> {
  render() {
    return (
      <p
        className={`
          ${styles.errorMessage}
          ${styles.blinksIn}
          unselectable
        `}
        style={this.props.style}
      >
        {this.props.message}
        {this.props.children}
      </p>
    );
  }
}

export default ErrorMessage;
