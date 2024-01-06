import * as React from 'react';

import styles from './ErrorMessage.css';

export type Props = {
  children: React.ReactNode;
};

export function ErrorMessage(props: Props) {
  let text = (
    <p className={styles.text} >
      {props.children}
    </p>
  );

  let borderTopTriangle = <div className={styles.borderTopTriangle} />;

  let fillTopTriangle = <div className={styles.fillTopTriangle} />;

  return (
    <div className={styles.errorMessage} >
      {text}
      {borderTopTriangle}
      {fillTopTriangle}
    </div>
  );
}
