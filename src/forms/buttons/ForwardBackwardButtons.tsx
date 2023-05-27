import * as React from 'react';
import styles from './ForwardBackwardButtons.css';

/**
 * Meant to help standardize the appearance of bring to front buttons
 * for drawing elements.
 */
export function BringToFrontButton(
  props: {
    onClick?: () => void,
    style?: React.CSSProperties,
  },
) {
  return (
    <button
      className={styles.forwardBackwardButton}
      onClick={props.onClick}
      style={props.style}
    >
      Bring to Front
    </button>
  );
}

/**
 * Meant to help standardize the appearance of send to back buttons
 * for drawing elements.
 */
export function SendToBackButton(
  props: {
    onClick?: () => void,
    style?: React.CSSProperties,
  },
) {
  return (
    <button
      className={styles.forwardBackwardButton}
      onClick={props.onClick}
      style={props.style}
    >
      Send to Back
    </button>
  );
}

/**
 * Renders as a bring to front button and a send to back button on one row.
 *
 * Meant to help standardize the appearance of forward and backward buttons
 * for drawing elements.
 */
export function ForwardBackwardButtons(
  props: {
    bringToFront?: () => void, // bound to bring to front button
    sendToBack?: () => void, // bound to send to back button
    style?: React.CSSProperties,
  },
) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        ...props.style,
      }}
    >
      <BringToFrontButton onClick={props.bringToFront} />
      <div style={{ width: '10px' }} />
      <SendToBackButton onClick={props.sendToBack} />
    </div>
  );
}
