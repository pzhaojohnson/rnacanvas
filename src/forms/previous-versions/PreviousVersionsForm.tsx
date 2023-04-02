import * as React from 'react';

import styles from './PreviousVersionsForm.css';

import { Header } from './private/Header';

import { LeadingNoteOnSavedDrawings } from './private/LeadingNoteOnSavedDrawings';

import { PreviousVersionsList } from './private/PreviousVersionsList';

export function PreviousVersionsForm() {
  return (
    <div className={styles.previousVersionsForm} >
      <Header />
      <LeadingNoteOnSavedDrawings />
      <PreviousVersionsList />
    </div>
  );
}
