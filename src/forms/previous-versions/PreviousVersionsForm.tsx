import * as React from 'react';

import styles from './PreviousVersionsForm.css';

import { Header } from './private/Header';

import { BackButton } from './private/BackButton';

import { ANoteOnSavedDrawings } from './private/ANoteOnSavedDrawings';

import { PreviousVersionsList } from './private/PreviousVersionsList';

export type Props = {
  /**
   * Callback to go backwards from this form.
   */
  goBack: () => void;
};

export function PreviousVersionsForm(props: Props) {
  return (
    <div className={styles.previousVersionsForm} >
      <div className={styles.content} >
        <BackButton onClick={props.goBack} />
        <Header />
        <ANoteOnSavedDrawings />
        <PreviousVersionsList />
      </div>
    </div>
  );
}
