import * as React from 'react';
import styles from './AskBeforeLeavingToggle.css';
import type { App } from 'App';

function Check() {
  return (
    <svg
      className={styles.check}
      width="10.5px"
      height="10.5px"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      overflow="hidden"
    >
      <path
        d="M86.1 15.8 34.9 64.2 10.3 39 1.8 47.1 34.5 80.7 43.1 72.7 94.2 24.2Z"
        stroke="#FFFFFF"
        strokeWidth="3.66667"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export type Props = {
  app: App;
}

export class AskBeforeLeavingToggle extends React.Component<Props> {
  render() {
    let askBeforeLeaving = this.props.app.settings.askBeforeLeaving;
    return (
      <div
        className={`
          ${styles.askBeforeLeavingToggle}
          ${askBeforeLeaving ? styles.on : styles.off}
        `}
        onClick={() => this.handleClick()}
      >
        <div className={`${styles.pillContainer}`} >
          <p className={`${styles.text}`} >
            Ask Before Leaving
          </p>
          <div className={styles.spacer} />
          <Check />
        </div>
      </div>
    );
  }

  handleClick() {
    let askBeforeLeaving = this.props.app.settings.askBeforeLeaving;
    this.props.app.settings.askBeforeLeaving = !askBeforeLeaving;
    this.props.app.refresh();
  }
}
