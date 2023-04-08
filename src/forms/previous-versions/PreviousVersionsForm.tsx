import * as React from 'react';

import styles from './PreviousVersionsForm.css';

import { Header } from './private/Header';

import { BackButton } from './private/BackButton';

import { LeadingNoteOnSavedDrawings } from './private/LeadingNoteOnSavedDrawings';

import { PreviousVersionsList } from './private/PreviousVersionsList';

export type Props = {
  /**
   * Callback to go backwards from this form.
   */
  goBack: () => void;
};

export function PreviousVersionsForm(props: Props) {
  let backButton = <BackButton onClick={props.goBack} />;

  return (
    <div className={styles.previousVersionsForm} >
      <div className={styles.content} >
        <Header backButton={backButton} />
        <LeadingNoteOnSavedDrawings />
        <PreviousVersionsList />
      </div>
    </div>
  );
}
